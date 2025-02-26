from flask import Flask, request, jsonify
from googleapiclient.discovery import build
from email.mime.text import MIMEText
import base64
import logging
import os
import speech_recognition as sr
from flask_cors import CORS
from utils.gmail_auth import authenticate_gmail
from services.sentiment_analysis import analyze_sentiment
from services.bottleneck_analysis import predict_bottleneck
from services.ai_decision_maker import recommend_action

app = Flask(__name__)

# ✅ Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Enable logging
logging.basicConfig(level=logging.INFO)

# Authenticate Gmail API
creds = authenticate_gmail()
service = build("gmail", "v1", credentials=creds)

# 📧 **Send Email with Sentiment Analysis**
@app.route("/send-email", methods=["POST"])
def send_email():
    try:
        data = request.json
        to_email = data.get("to")
        subject = data.get("subject")
        message = data.get("message")

        if not to_email or not subject or not message:
            return jsonify({"error": "Missing required fields: to, subject, or message"}), 400

        # Analyze sentiment
        sentiment, confidence = analyze_sentiment(message)

        # Prepare email
        msg = MIMEText(message)
        msg["to"] = to_email
        msg["subject"] = subject
        raw = base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")
        email_body = {"raw": raw}

        # Send email
        service.users().messages().send(userId="me", body=email_body).execute()

        return jsonify({
            "status": "Email Sent Successfully!",
            "sentiment": sentiment,
            "confidence": confidence
        })

    except Exception as e:
        logging.error(f"Error sending email: {e}")
        return jsonify({"error": str(e)}), 500

# 📊 **Standalone Sentiment Analysis API**
@app.route("/analyze-email", methods=["POST"])
def analyze_email():
    data = request.json
    sentiment, confidence = analyze_sentiment(data["email"])
    return jsonify({"sentiment": sentiment, "confidence": confidence})

# 🔄 **Predict Bottleneck in Processes**
@app.route("/predict-bottleneck", methods=["POST"])
def bottleneck_api():
    try:
        data = request.get_json()
        tasks = data.get("tasks_in_queue")
        time = data.get("avg_processing_time")
        priority = data.get("priority", 0)

        if tasks is None or time is None:
            return jsonify({"error": "Missing required fields: tasks_in_queue or avg_processing_time"}), 400

        result = predict_bottleneck(tasks, time, priority)
        return jsonify({"bottleneck": result})

    except Exception as e:
        logging.error(f"Error predicting bottleneck: {e}")
        return jsonify({"error": str(e)}), 500

# 🧠 **AI Decision Maker**
@app.route("/ai-decision", methods=["POST"])
def ai_decision():
    try:
        data = request.json
        required_keys = [
            "LIMIT_BAL", "SEX", "EDUCATION", "MARRIAGE", "AGE", 
            "PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6",
            "BILL_AMT1", "BILL_AMT2", "BILL_AMT3", "BILL_AMT4", 
            "BILL_AMT5", "BILL_AMT6", "PAY_AMT1", "PAY_AMT2", 
            "PAY_AMT3", "PAY_AMT4", "PAY_AMT5", "PAY_AMT6"
        ]

        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_keys)}"}), 400

        action = recommend_action([data[key] for key in required_keys])
        return jsonify({"action": action})

    except Exception as e:
        logging.error(f"Error in AI decision-making: {e}")
        return jsonify({"error": str(e)}), 500

# 🎙 **Voice-to-Action API**
@app.route("/process-voice", methods=["POST"])
def process_voice():
    try:
        print("📡 Received voice request!")  # ✅ Debug log
        
        if "file" not in request.files:
            print("❌ No file uploaded!")  # ✅ Debug log
            return jsonify({"error": "No file uploaded"}), 400

        audio_file = request.files["file"]
        temp_audio_path = "backend/models/datasets/voice_temp.wav"
        audio_file.save(temp_audio_path)
        print(f"✅ Audio saved at: {temp_audio_path}")  # ✅ Debug log

        recognizer = sr.Recognizer()
        with sr.AudioFile(temp_audio_path) as source:
            print("🎤 Recording audio...")  # ✅ Debug log
            audio_data = recognizer.record(source)

        try:
            text = recognizer.recognize_google(audio_data)
            print(f"✅ Transcription: {text}")  # ✅ Debug log
            return jsonify({"status": "success", "text": text})
        except sr.UnknownValueError:
            return jsonify({"status": "error", "message": "Could not understand the audio"})
        except sr.RequestError as e:
            return jsonify({"status": "error", "message": f"Speech Recognition error: {e}"})

    except Exception as e:
        print(f"❌ Error processing voice: {e}")  # ✅ Debug log
        return jsonify({"error": str(e)}), 500

@app.route("/adaptive-learning", methods=["POST"])
def adaptive_learning():
    try:
        data = request.json.get("data", "")
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Process and generate recommendation (mockup example)
        recommendation = f"Based on your input, we suggest: {data.upper()}"

        return jsonify({"recommendation": recommendation})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🚀 **Run Flask App**
if __name__ == "__main__":
    app.run(debug=True, port=8000)

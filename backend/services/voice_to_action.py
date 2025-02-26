from google.cloud import speech
import os
import pandas as pd
import json
import io

# Get the absolute base directory
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))

# Load Google Speech API credentials
CREDENTIALS_PATH = os.path.join(BASE_DIR, "backend/google_credentials.json")

if not os.path.exists(CREDENTIALS_PATH):
    raise FileNotFoundError(f"❌ Credentials file not found: {CREDENTIALS_PATH}")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = CREDENTIALS_PATH

# Define dataset and output paths
DATASET_PATH = os.path.join(BASE_DIR, "backend/models/datasets/voice_commands")
OUTPUT_CSV = os.path.join(BASE_DIR, "backend/models/datasets/voice_transcriptions.csv")

# Ensure dataset directory exists
if not os.path.exists(DATASET_PATH):
    raise FileNotFoundError(f"❌ Dataset directory not found: {DATASET_PATH}")

def process_voice_command(audio_path):
    client = speech.SpeechClient()

    with io.open(audio_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,  # Adjust based on your dataset
        language_code="en-US",
    )

    try:
        response = client.recognize(config=config, audio=audio)
        text = response.results[0].alternatives[0].transcript if response.results else ""
        return {"status": "success", "text": text}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Process all audio files
results = []
for file in os.listdir(DATASET_PATH):
    if file.endswith(".wav"):
        file_path = os.path.join(DATASET_PATH, file)
        result = process_voice_command(file_path)
        results.append({"file": file, "status": result["status"], "text": result.get("text", "")})

# Save results to CSV
df = pd.DataFrame(results)
df.to_csv(OUTPUT_CSV, index=False)

print(f"✅ Transcriptions saved to {OUTPUT_CSV}")

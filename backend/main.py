from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import os
import speech_recognition as sr
from fastapi.middleware.cors import CORSMiddleware
from backend.services.sentiment_analysis import analyze_sentiment
from backend.services.bottleneck_analysis import predict_bottleneck
from backend.services.ai_decision_maker import recommend_action
from backend.services.voice_to_action import process_voice_command
from backend.services.auto_code_doc import generate_code_documentation
from fastapi.responses import JSONResponse
import sys
from fastapi.middleware.cors import CORSMiddleware


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all domains (change this to specific frontend URL for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


sys.path.append(os.path.abspath(os.path.dirname(__file__)))

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"



# ✅ Fix: Enable CORS (Allow frontend to call API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change if using a different frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class EmailRequest(BaseModel):
    content: str

class VoiceCommandRequest(BaseModel):
    audio_file: str

class CodeInput(BaseModel):
    code_snippet: str

class BottleneckRequest(BaseModel):
    tasks_in_queue: int
    avg_processing_time: float
    priority_level: int

class WorkflowData(BaseModel):
    LIMIT_BAL: float
    SEX: int
    EDUCATION: int
    MARRIAGE: int
    AGE: int
    PAY_0: int
    PAY_2: int
    PAY_3: int
    PAY_4: int
    PAY_5: int
    PAY_6: int
    BILL_AMT1: float
    BILL_AMT2: float
    BILL_AMT3: float
    BILL_AMT4: float
    BILL_AMT5: float
    BILL_AMT6: float
    PAY_AMT1: float
    PAY_AMT2: float
    PAY_AMT3: float
    PAY_AMT4: float
    PAY_AMT5: float
    PAY_AMT6: float

class DecisionMakerRequest(BaseModel):
    workflow_data: WorkflowData

@app.post("/process_voice/")
async def process_voice(audio_file: UploadFile = File(...)):
    """Process voice commands from an uploaded .wav file and transcribe speech to text."""
    if not audio_file.filename.endswith(".wav"):
        raise HTTPException(status_code=400, detail="Only WAV files are supported")

    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)

    file_path = os.path.join(temp_dir, audio_file.filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await audio_file.read())

    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(file_path) as source:
            recognizer.adjust_for_ambient_noise(source)
            audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        return {"transcribed_text": text}

    except sr.UnknownValueError:
        return {"error": "Could not understand the audio"}
    except sr.RequestError:
        return {"error": "Error connecting to speech recognition service"}
    except FileNotFoundError:
        return {"error": "Audio file not found"}

@app.get("/")
def read_root():
    """Check if API is running."""
    return {"message": "API is working!"}

@app.post("/analyze_email/")
def analyze_email(request: EmailRequest):
    """Analyze sentiment of an email."""
    sentiment = analyze_sentiment(request.content)
    return {"sentiment": sentiment}

@app.post("/predict_bottleneck/")
async def predict_bottleneck_api(request: BottleneckRequest):
    """Predict bottleneck in a workflow."""
    try:
        prediction = predict_bottleneck(request.tasks_in_queue, request.avg_processing_time, request.priority_level)
        return {"bottleneck_detected": bool(prediction)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Bottleneck Prediction Error: {str(e)}"})

@app.post("/decision_maker/")
def decision_maker_api(request: DecisionMakerRequest):
    """AI-based decision making."""
    try:
        features = [
            request.workflow_data.LIMIT_BAL, request.workflow_data.SEX, request.workflow_data.EDUCATION,
            request.workflow_data.MARRIAGE, request.workflow_data.AGE, request.workflow_data.PAY_0,
            request.workflow_data.PAY_2, request.workflow_data.PAY_3, request.workflow_data.PAY_4,
            request.workflow_data.PAY_5, request.workflow_data.PAY_6, request.workflow_data.BILL_AMT1,
            request.workflow_data.BILL_AMT2, request.workflow_data.BILL_AMT3, request.workflow_data.BILL_AMT4,
            request.workflow_data.BILL_AMT5, request.workflow_data.BILL_AMT6, request.workflow_data.PAY_AMT1,
            request.workflow_data.PAY_AMT2, request.workflow_data.PAY_AMT3, request.workflow_data.PAY_AMT4,
            request.workflow_data.PAY_AMT5, request.workflow_data.PAY_AMT6
        ]
        action = recommend_action(features)
        return {"recommended_action": action}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Decision Maker Error: {str(e)}"})

@app.post("/generate_docs/")
def generate_code_doc(input_data: CodeInput):
    """Generate code documentation."""
    try:
        doc = generate_code_documentation(input_data.code_snippet)
        return {"documentation": doc}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Code Documentation Error: {str(e)}"})

@app.exception_handler(Exception)
async def internal_exception_handler(request, exc):
    """General exception handler."""
    return JSONResponse(status_code=500, content={"error": f"Internal Server Error: {str(exc)}"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Keys (Use os.environ to keep keys secure)
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
GOOGLE_SPEECH_API_KEY = os.environ.get("GOOGLE_SPEECH_API_KEY")

# Paths to trained models
MODEL_PATHS = {
    "sentiment": "backend/models/sentiment_model.pkl",
    "bottleneck": "backend/models/bottleneck_model.pkl",
    "decision_maker": "backend/models/decision_model.pkl",
    "voice": "backend/models/voice_model.pkl",
    "auto_code": "backend/models/auto_code_model.pkl",
    "adaptive_learning": "backend/models/adaptive_learning_model.pkl"
}

# Dataset paths
DATASET_PATHS = {
    "sentiment": "backend/models/datasets/sentiment_data.csv",
    "bottleneck": "backend/models/datasets/bottleneck_data.csv",
    "decision_maker": "backend/models/datasets/decision_data.csv",
    "voice": "backend/models/datasets/voice_commands_data.csv",
    "auto_code": "backend/models/datasets/auto_code_data.csv",
    "adaptive_learning": "backend/models/datasets/adaptive_learning_data.csv"
}

# Training parameters
TRAINING_PARAMS = {
    "test_size": 0.2,
    "random_state": 42
}

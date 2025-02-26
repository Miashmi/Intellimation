import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# Get absolute paths
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
DATASET_PATH = os.path.join(BASE_DIR, "backend/models/datasets/bottleneck_data.csv")
MODEL_DIR = os.path.join(BASE_DIR, "backend/models")
MODEL_PATH = os.path.join(MODEL_DIR, "bottleneck_model.pkl")

# Ensure dataset exists
if not os.path.exists(DATASET_PATH):
    raise FileNotFoundError(f"❌ Dataset not found: {DATASET_PATH}")

# Ensure model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

# Load dataset
df = pd.read_csv(DATASET_PATH)
print("✅ Dataset loaded successfully!")

# Check dataset structure
print("Columns:", df.columns)
print(df.head())

# Ensure required columns exist
required_columns = ["tasks_in_queue", "avg_processing_time"]
missing_columns = [col for col in required_columns if col not in df.columns]
if missing_columns:
    raise KeyError(f"❌ Missing columns: {missing_columns}")

# ✅ Create 'bottleneck' column (Define bottleneck based on avg_processing_time)
threshold = df["avg_processing_time"].median()  # Use median as threshold
df["bottleneck"] = (df["avg_processing_time"] > threshold).astype(int)

# Verify class distribution
print("Class Distribution:\n", df["bottleneck"].value_counts())

# Select features
features = ["tasks_in_queue", "avg_processing_time"]
if "Machine2.MotorAmperage.U.Actual" in df.columns:
    features.append("Machine2.MotorAmperage.U.Actual")

X = df[features]
y = df["bottleneck"]

# Train-test split (80-20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Model training
param_grid = {'n_estimators': [100, 300], 'max_depth': [10, 20, None]}
grid_search = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid_search.fit(X_train, y_train)

# Save trained model
best_model = grid_search.best_estimator_
joblib.dump(best_model, MODEL_PATH)
print(f"✅ Model trained and saved at: {MODEL_PATH}")

# Function to predict bottlenecks
def predict_bottleneck(tasks, time, priority=0):
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"❌ Model file not found: {MODEL_PATH}")

    model = joblib.load(MODEL_PATH)
    return bool(model.predict([[tasks, time, priority]])[0])

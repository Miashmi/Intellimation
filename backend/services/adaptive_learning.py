import pandas as pd
import joblib

# Load Existing Model
try:
    model = joblib.load("backend/models/bottleneck_model.pkl")
except FileNotFoundError:
    raise Exception("Model file not found. Ensure 'bottleneck_model.pkl' exists.")

def retrain_model(new_data):
    df = pd.DataFrame(new_data)

    # Check if required columns exist in dataset
    required_columns = {"Attendance_Percentage", "Time_Spent_On_Learning_Platform", "Assessment_Performance"}
    if not required_columns.issubset(df.columns):
        raise ValueError(f"Incorrect data format. Required columns: {required_columns}")

    # Selecting features
    X = df[["Attendance_Percentage", "Time_Spent_On_Learning_Platform"]]
    y = df["Assessment_Performance"]  # Assuming this indicates performance bottleneck

    # Retrain model
    model.fit(X, y)
    joblib.dump(model, "backend/models/bottleneck_model.pkl")  # Save updated model

    return "Model retrained successfully!"

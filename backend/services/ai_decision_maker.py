import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Define dataset and model paths
dataset_dir = os.path.join("backend", "models", "datasets")
dataset_path = os.path.join(dataset_dir, "decision_data.csv")
model_path = os.path.join("backend", "models", "decision_model.pkl")
scaler_path = os.path.join("backend", "models", "decision_scaler.pkl")

# ✅ Ensure dataset directory exists
os.makedirs(dataset_dir, exist_ok=True)

# ✅ Check if dataset exists before loading
if not os.path.exists(dataset_path):
    print(f"❌ Dataset not found at {dataset_path}. Skipping model training.")
else:
    # Load dataset
    df_decision = pd.read_csv(dataset_path)

    # Drop unnecessary columns
    if "ID" in df_decision.columns:
        df_decision = df_decision.drop(columns=["ID"])

    # Required columns
    required_columns = [
        "LIMIT_BAL", "SEX", "EDUCATION", "MARRIAGE", "AGE", 
        "PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6",
        "BILL_AMT1", "BILL_AMT2", "BILL_AMT3", "BILL_AMT4", 
        "BILL_AMT5", "BILL_AMT6", "PAY_AMT1", "PAY_AMT2", 
        "PAY_AMT3", "PAY_AMT4", "PAY_AMT5", "PAY_AMT6"
    ]

    # ✅ Ensure all required columns exist
    missing_cols = set(required_columns) - set(df_decision.columns)
    if missing_cols:
        raise ValueError(f"❌ Dataset is missing columns: {missing_cols}")

    # Define input features and target variable
    X_decision = df_decision[required_columns]
    y_decision = df_decision["default.payment.next.month"]

    # Standardize numeric features
    scaler = StandardScaler()
    X_decision_scaled = scaler.fit_transform(X_decision)

    # Train Decision Tree model
    model_decision = DecisionTreeClassifier(random_state=42)
    model_decision.fit(X_decision_scaled, y_decision)

    # ✅ Save model and scaler
    joblib.dump(model_decision, model_path)
    joblib.dump(scaler, scaler_path)

    print("✅ Model trained successfully!")

# ✅ Function to predict risk level
def predict_default(features):
    if not os.path.exists(model_path) or not os.path.exists(scaler_path):
        return "❌ Model not available. Ensure training is completed."

    # Load trained model and scaler
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)

    # Convert features to DataFrame and scale
    feature_names = required_columns
    features_df = pd.DataFrame([features], columns=feature_names)
    features_scaled = scaler.transform(features_df)

    # Predict risk label
    return int(model.predict(features_scaled)[0])

# ✅ Function to recommend action
def recommend_action(features):
    prediction = predict_default(features)
    if isinstance(prediction, str):
        return prediction  # Return error message if model is missing
    return "High Risk - Reduce Credit Usage" if prediction == 1 else "Low Risk - Maintain Good Credit Behavior"

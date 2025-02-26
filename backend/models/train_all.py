import pickle
import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score
from utils.preprocess import (
    load_sentiment_data, load_bottleneck_data, load_decision_maker_data, 
    load_voice_command_data, load_auto_code_doc_data, load_adaptive_learning_data
)
from utils.config import MODEL_PATHS

# Ensure models directory exists
os.makedirs("../models", exist_ok=True)

def train_sentiment_model():
    """Train and save sentiment analysis model."""
    X_train, X_test, y_train, y_test = load_sentiment_data()
    vectorizer = TfidfVectorizer()
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    model = LogisticRegression()
    model.fit(X_train_tfidf, y_train)
    predictions = model.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, predictions)

    with open(MODEL_PATHS["sentiment"], "wb") as f:
        pickle.dump((vectorizer, model), f)

    print(f"✅ Sentiment Model Trained – Accuracy: {accuracy:.2f}")

def train_bottleneck_model():
    """Train and save bottleneck prediction model."""
    X_train, X_test, y_train, y_test = load_bottleneck_data()
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)

    with open(MODEL_PATHS["bottleneck"], "wb") as f:
        pickle.dump(model, f)

    print(f"✅ Bottleneck Model Trained – Accuracy: {accuracy:.2f}")

def train_decision_maker_model():
    """Train and save AI decision-making model."""
    X_train, X_test, y_train, y_test = load_decision_maker_data()
    model = SVC()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)

    with open(MODEL_PATHS["decision_maker"], "wb") as f:
        pickle.dump(model, f)

    print(f"✅ Decision Maker Model Trained – Accuracy: {accuracy:.2f}")

def train_voice_model():
    """Train and save voice-to-action model."""
    X_train, X_test, y_train, y_test = load_voice_command_data()
    vectorizer = TfidfVectorizer()
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    model = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=500)
    model.fit(X_train_tfidf, y_train)
    predictions = model.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, predictions)

    with open(MODEL_PATHS["voice"], "wb") as f:
        pickle.dump((vectorizer, model), f)

    print(f"✅ Voice Model Trained – Accuracy: {accuracy:.2f}")

def train_auto_code_model():
    """Train and save auto-code documentation model."""
    X_train, X_test, y_train, y_test = load_auto_code_doc_data()
    vectorizer = TfidfVectorizer()
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train_tfidf, y_train)
    predictions = model.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, predictions)

    with open(MODEL_PATHS["auto_code"], "wb") as f:
        pickle.dump((vectorizer, model), f)

    print(f"✅ Auto-Code Documentation Model Trained – Accuracy: {accuracy:.2f}")

def train_adaptive_learning_model():
    """Train and save adaptive learning model."""
    X_train, X_test, y_train, y_test = load_adaptive_learning_data()
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)

    with open(MODEL_PATHS["adaptive_learning"], "wb") as f:
        pickle.dump(model, f)

    print(f"✅ Adaptive Learning Model Trained – Accuracy: {accuracy:.2f}")

if __name__ == "__main__":
    print("🚀 Training all models...\n")
    train_sentiment_model()
    train_bottleneck_model()
    train_decision_maker_model()
    train_voice_model()
    train_auto_code_model()
    train_adaptive_learning_model()
    print("\n🎯 All models trained and saved successfully!")

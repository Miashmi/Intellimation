import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
from transformers import pipeline
import os

dataset_path = os.path.join(os.path.dirname(__file__), "../models/datasets/sentiment_data.csv")
if not os.path.exists(dataset_path):
    raise FileNotFoundError(f"❌ Dataset not found at: {dataset_path}")

df = pd.read_csv(dataset_path, encoding="latin-1", names=["target", "id", "date", "flag", "user", "text"])
df = df[["target", "text"]].dropna()
df["target"] = df["target"].replace({0: 0, 4: 1})


vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(df["text"])
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = MultinomialNB()
model.fit(X_train, y_train)

model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../models/sentiment_model.pkl"))

print(f"🔍 Looking for model at: {model_path}")

# Check if file exists before trying to open it
if not os.path.exists(model_path):
    raise FileNotFoundError(f"❌ Model file not found at: {model_path}")

with open(model_path, "rb") as f:
    sentiment_model = pickle.load(f)
print("✅ Sentiment model loaded successfully!")
    

sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english")

def analyze_sentiment(text):
    result = sentiment_pipeline(text)[0]
    return result["label"], result["score"]

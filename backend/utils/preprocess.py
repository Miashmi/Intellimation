import pandas as pd
from sklearn.model_selection import train_test_split

def load_sentiment_data():
    df = pd.read_csv("backend/models/datasets/sentiment_data.csv", encoding="latin1", header=None)
    df.columns = ["target", "id", "date", "flag", "user", "text"]
    df = df[["target", "text"]]
    df["target"] = df["target"].map({0: "negative", 2: "neutral", 4: "positive"})
    return train_test_split(df["text"], df["target"], test_size=0.2, random_state=42)

def load_bottleneck_data():
    df = pd.read_csv("backend/models/datasets/bottleneck_data.csv")
    X = df.drop(columns=["bottleneck"])
    y = df["bottleneck"]
    return train_test_split(X, y, test_size=0.2, random_state=42)

def load_decision_maker_data():
    df = pd.read_csv("backend/models/datasets/decision_data.csv")
    X = df.drop(columns=["decision"])
    y = df["decision"]
    return train_test_split(X, y, test_size=0.2, random_state=42)

def load_voice_command_data():
    df = pd.read_csv("backend/models/datasets/voice_commands_data.csv")
    X = df["command"]
    y = df["label"]
    return train_test_split(X, y, test_size=0.2, random_state=42)

def load_auto_code_doc_data():
    df = pd.read_csv("backend/models/datasets/auto_code_data.csv")
    X = df["code"]
    y = df["documentation"]
    return train_test_split(X, y, test_size=0.2, random_state=42)

def load_adaptive_learning_data():
    df = pd.read_csv("backend/models/datasets/adaptive_learning_data.csv")
    X = df.drop(columns=["performance"])
    y = df["performance"]
    return train_test_split(X, y, test_size=0.2, random_state=42)

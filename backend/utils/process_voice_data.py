import os
import librosa
import numpy as np
import pandas as pd
import multiprocessing
from tqdm import tqdm

DATASET_PATH = os.path.join("backend", "models", "datasets", "voice_commands")
OUTPUT_CSV = os.path.join("backend", "models", "datasets", "voice_commands_data.csv")

def extract_features(file_path):
    """Extract MFCC features from a given audio file."""
    try:
        y, sr = librosa.load(file_path, sr=16000)  # Load audio file
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # Extract 13 MFCC features
        return np.mean(mfcc, axis=1)  # Average over time
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return None

def process_folder(label):
    """Process all .wav files in a given folder (Parallel Execution)."""
    label_path = os.path.join(DATASET_PATH, label)
    data = []

    if os.path.isdir(label_path):
        files = [f for f in os.listdir(label_path) if f.endswith(".wav")]
        for file in tqdm(files, desc=f"Processing {label}"):
            file_path = os.path.join(label_path, file)
            features = extract_features(file_path)
            
            if features is not None:
                data.append([*features, label])  # Append extracted features + label

    return data

def process_dataset():
    """Process all folders in parallel and save as CSV."""
    labels = [folder for folder in os.listdir(DATASET_PATH) if os.path.isdir(os.path.join(DATASET_PATH, folder))]

    # Parallel processing using multiprocessing
    with multiprocessing.Pool(processes=multiprocessing.cpu_count()) as pool:
        results = pool.map(process_folder, labels)

    # Flatten results (merge all lists)
    all_data = [item for sublist in results for item in sublist]

    # Convert to DataFrame and Save
    df = pd.DataFrame(all_data)
    df.to_csv(OUTPUT_CSV, index=False, header=[f"mfcc_{i}" for i in range(13)] + ["intent"])
    print(f"\n✅ Voice dataset saved to {OUTPUT_CSV}")

if __name__ == "__main__":
    process_dataset()

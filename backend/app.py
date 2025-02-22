from fastapi import FastAPI, File, UploadFile
import numpy as np
import librosa
import tensorflow as tf
from tensorflow.keras.models import load_model
import io

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL (e.g., http://localhost:3000) in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load the trained model
model = load_model("heartbeat_cnn_model.h5")

# Define class labels (Modify based on your dataset)
class_labels = ["Normal", "Murmur", "Extrahls", "Artifact", "Unknown"]

def preprocess_audio(file: bytes, target_shape=(128, 1000)):
    """Load and preprocess the audio for CNN prediction."""
    audio, sr = librosa.load(io.BytesIO(file), sr=22050)
    audio, _ = librosa.effects.trim(audio)  # Trim silence
    audio = librosa.util.normalize(audio)  # Normalize
    audio = librosa.util.fix_length(audio, size=target_shape[0] * target_shape[1])  # Resize
    audio = audio.reshape(target_shape + (1,))  # Reshape for CNN
    return np.expand_dims(audio, axis=0)

@app.post("/predict")
async def predict_heartbeat(file: UploadFile = File(...)):
    """Receives an audio file, processes it, and returns the predicted class."""
    audio_bytes = await file.read()
    processed_audio = preprocess_audio(audio_bytes)
    
    # Predict
    prediction = model.predict(processed_audio)
    predicted_label = np.argmax(prediction)
    
    return {
        "filename": file.filename,
        "predicted_class": class_labels[predicted_label],
        "confidence_scores": prediction.tolist()
    }


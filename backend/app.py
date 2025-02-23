<<<<<<< Updated upstream
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
=======
import os
import numpy as np
import tensorflow as tf
import librosa
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
>>>>>>> Stashed changes

app = FastAPI(title="Cardiovascular Disease Prediction API")

<<<<<<< Updated upstream
# Enable CORS (Allow requests from the frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL for security
=======
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
>>>>>>> Stashed changes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< Updated upstream
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder exists

@app.post("/predict")
async def predict(audio: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, audio.filename)

        # Save the uploaded file temporarily
        with open(file_path, "wb") as f:
            f.write(await audio.read())

        # Here, replace this with your ML model inference
        predicted_class = "Normal"  # Dummy Prediction

        return JSONResponse(
            content={"filename": audio.filename, "predicted_class": predicted_class},
            status_code=200
        )
    except Exception as e:
        return JSONResponse(content={"message": str(e)}, status_code=500)
=======
app.mount("/static", StaticFiles(directory="static"), name="static")

MODEL_PATH = "Heart_model.h5"
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    raise RuntimeError(f"Failed to load model: {str(e)}")

TARGET_SAMPLE_RATE = 16000
FIXED_DURATION = 5
FIXED_LENGTH = TARGET_SAMPLE_RATE * FIXED_DURATION
HOP_LENGTH = 512
SPECTROGRAM_LENGTH = int((FIXED_DURATION * TARGET_SAMPLE_RATE) / HOP_LENGTH) + 1
CLASS_NAMES = ['artifact', 'extrastole', 'extrahls', 'murmur', 'normal']

def preprocess_audio(filename: str) -> np.ndarray:
    try:
        signal, sr = librosa.load(filename, sr=TARGET_SAMPLE_RATE)
        if len(signal) > FIXED_LENGTH:
            signal = signal[:FIXED_LENGTH]
        else:
            signal = np.pad(signal, (0, FIXED_LENGTH - len(signal)))
        signal = signal / np.max(np.abs(signal)) if np.max(np.abs(signal)) > 0 else signal
        spectrogram = librosa.feature.melspectrogram(y=signal, sr=TARGET_SAMPLE_RATE, n_mels=128, hop_length=HOP_LENGTH)
        spectrogram = librosa.power_to_db(spectrogram, ref=np.max)
        if spectrogram.shape[1] > SPECTROGRAM_LENGTH:
            spectrogram = spectrogram[:, :SPECTROGRAM_LENGTH]
        else:
            padding = SPECTROGRAM_LENGTH - spectrogram.shape[1]
            spectrogram = np.pad(spectrogram, ((0, 0), (0, padding)), mode='constant')
        spectrogram = spectrogram[..., np.newaxis]
        return spectrogram
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio preprocessing error: {str(e)}")

@app.get("/", response_class=HTMLResponse)
async def root():
    try:
        with open("static/index.html", "r") as f:
            return HTMLResponse(content=f.read())
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Frontend file not found. Ensure static/index.html exists.")

@app.get("/predict")
async def predict_get():
    return {"message": "Use POST to /predict with an audio file upload. See /docs for details."}

@app.post("/predict", response_model=Dict[str, str | float])
async def predict(file: UploadFile = File(...)):
    try:
        temp_file = "temp_audio.wav"
        with open(temp_file, "wb") as f:
            f.write(await file.read())
        spectrogram = preprocess_audio(temp_file)
        spectrogram = np.expand_dims(spectrogram, axis=0)
        prediction = model.predict(spectrogram)
        predicted_class_idx = np.argmax(prediction, axis=1)[0]
        predicted_label = CLASS_NAMES[predicted_class_idx]
        confidence = float(prediction[0][predicted_class_idx])
        os.remove(temp_file)
        return {"predicted_label": predicted_label, "confidence": confidence}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
>>>>>>> Stashed changes

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os

app = FastAPI()

# Enable CORS (Allow requests from the frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

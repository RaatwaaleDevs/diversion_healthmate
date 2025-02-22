import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from googletrans import Translator, LANGUAGES
import speech_recognition as sr
from gtts import gTTS
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
import tempfile

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found. Check .env file.")
print(f"API Key Loaded: {GOOGLE_API_KEY[:5]}...")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize FastAPI app
app = FastAPI(title="Health Chatbot")

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Initialize Gemini model
model = genai.GenerativeModel("gemini-pro")

# Define request model
class ChatRequest(BaseModel):
    message: str
    language: str = "en"

@app.get("/", response_class=HTMLResponse)
async def root():
    with open("static/index.html", "r") as f:
        return HTMLResponse(content=f.read())

translator = Translator()

HEALTH_PROMPT = """
You are a friendly health expert chatbot. Your primary focus is to provide accurate and helpful advice on health-related questions. 
- For health-related questions, give detailed and useful responses.
- For greetings (e.g., 'Hello', 'Hi'), respond politely with a greeting and a brief introduction, like: 'Hi! I’m your health chatbot, here to help with any health questions you have.'
- For simple yes/no questions (e.g., 'Are you a doctor?'), provide a clear yes or no answer with a short explanation, staying in character as a health chatbot.
- For non-health-related questions that don’t fit the above, gently redirect with: 'I’m here to help with health topics. Do you have a health-related question I can assist with?'
"""

@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message
    target_language = request.language.lower()

    detected_lang = translator.detect(user_message).lang
    if detected_lang != "en":
        user_message_en = translator.translate(user_message, dest="en").text
    else:
        user_message_en = user_message

    full_prompt = f"{HEALTH_PROMPT}\nUser: {user_message_en}"
    response = model.generate_content(full_prompt)
    response_text = response.text

    if target_language != "en":
        if target_language in LANGUAGES:
            response_text = translator.translate(response_text, dest=target_language).text
        else:
            response_text += f" (Translation to '{target_language}' not supported, defaulting to English)"

    return {"response": response_text}

# Voice endpoint with fallback
recognizer = sr.Recognizer()

@app.post("/voice_chat")
async def voice_chat(language: str = "en"):
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)

    try:
        user_message = recognizer.recognize_google(audio)
        print(f"User said: {user_message}")

        detected_lang = translator.detect(user_message).lang
        if detected_lang != "en":
            user_message_en = translator.translate(user_message, dest="en").text
        else:
            user_message_en = user_message

        full_prompt = f"{HEALTH_PROMPT}\nUser: {user_message_en}"
        response = model.generate_content(full_prompt)
        response_text = response.text

        target_language = language.lower()
        if target_language != "en" and target_language in LANGUAGES:
            response_text = translator.translate(response_text, dest=target_language).text

        # Handle unsupported languages for gTTS
        try:
            tts = gTTS(text=response_text, lang=target_language)
        except ValueError:
            response_text += f" (Audio in '{target_language}' not supported, using English)"
            tts = gTTS(text=response_text, lang="en")

        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        tts.save(temp_file.name)

        return FileResponse(temp_file.name, media_type="audio/mpeg", filename="response.mp3")

    except sr.UnknownValueError:
        raise HTTPException(status_code=400, detail="Could not understand audio")
    except sr.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Speech recognition error: {e}")
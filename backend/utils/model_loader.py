import pickle
import os
import logging

logging.basicConfig(level=logging.INFO)

MODEL_PATH = os.path.join("model", "heart_disease_model.pkl")

def load_model():
    """ Load the trained model safely """
    try:
        with open(MODEL_PATH, "rb") as file:
            model = pickle.load(file)

        if not hasattr(model, "predict"):
            raise ValueError("Invalid model: Missing 'predict' method.")

        logging.info("✅ Model loaded successfully.")
        return model

    except Exception as e:
        logging.error(f"❌ Error loading model: {e}")
        return None

heart_disease_model = load_model()

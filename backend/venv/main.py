from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess_image(image: Image.Image):
    image = image.convert("L")        # grayscale
    image = image.resize((28, 28))    # resize
    image_array = np.array(image) / 255.0  # normalize
    return image_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    processed = preprocess_image(image)

    return {
        "status": "preprocessed",
        "shape": processed.shape,
        "min": float(processed.min()),
        "max": float(processed.max())
    }

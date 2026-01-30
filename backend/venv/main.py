from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Kannada AI backend is running"}

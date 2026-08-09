from fastapi import FastAPI

from app.routers import patients


app = FastAPI(
    title="Medical Blockchain API",
    version="1.0.0"
)


app.include_router(patients.router)


@app.get("/")
def health_check():
    return {
        "message": "Medical Blockchain API is running"
    }
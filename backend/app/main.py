from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import patients
from app.routers import organization
from app.routers import staff


app = FastAPI(
    title="Medical Blockchain API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router)
app.include_router(organization.router)
app.include_router(staff.router)


@app.get("/")
def health_check():
    return {
        "message": "Medical Blockchain API is running"
    }
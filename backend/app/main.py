from fastapi import FastAPI

from app.routers import patients
from app.routers import organization
from app.routers import staff
from app.routers import prescriptions

app = FastAPI(
    title="Medical Blockchain API",
    version="1.0.0"
)


app.include_router(patients.router)
app.include_router(organization.router)
app.include_router(staff.router)
app.include_router(prescriptions.router)


@app.get("/")
def health_check():
    return {
        "message": "Medical Blockchain API is running"
    }
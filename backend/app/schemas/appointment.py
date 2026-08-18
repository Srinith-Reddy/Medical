from pydantic import BaseModel
from datetime import datetime


class AppointmentCreate(BaseModel):
    appointment_id: str
    patient_id: str
    doctor_id: str
    organization_id: str
    appointment_date: datetime
    status: str = "SCHEDULED"


class AppointmentStatusUpdate(BaseModel):
    status: str
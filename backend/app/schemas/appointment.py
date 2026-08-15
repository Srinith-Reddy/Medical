from pydantic import BaseModel
from datetime import datetime


class AppointmentCreate(BaseModel):
    patient_id: str
    organization_id: str
    appointment_date: datetime
    status: str = "SCHEDULED"
    doctor_id: str
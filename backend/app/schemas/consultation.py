from pydantic import BaseModel


class ConsultationCreate(BaseModel):
    appointment_id: str
    patient_id: str
    staff_id: str
    organization_id: str
    appointment_id: str | None = None
    diagnosis: str
    notes: str
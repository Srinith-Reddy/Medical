from pydantic import BaseModel


class ConsultationCreate(BaseModel):
    patient_id: str
    staff_id: str
    organization_id: str
    diagnosis: str
    notes: str
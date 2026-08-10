from pydantic import BaseModel
from typing import Optional


class PrescriptionMedicine(BaseModel):
    medicine_id: str
    dosage: str
    quantity: int
    instructions: str


class PrescriptionCreate(BaseModel):
    patient_id: str
    organization_id: str
    staff_id: str
    consultation_id: Optional[str] = None
    medicines: list[PrescriptionMedicine]
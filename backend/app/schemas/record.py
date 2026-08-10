from pydantic import BaseModel
from typing import Optional


class RecordCreate(BaseModel):
    patient_id: str
    organization_id: str
    staff_id: str
    consultation_id: Optional[str] = None
    record_type: str
    file_path: Optional[str] = None
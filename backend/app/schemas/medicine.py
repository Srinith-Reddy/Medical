from pydantic import BaseModel


class MedicineCreate(BaseModel):
    name: str
    generic_name: str
    category: str
    standard_dosage: str
    manufacturer: str
    form: str
    requires_rx: bool
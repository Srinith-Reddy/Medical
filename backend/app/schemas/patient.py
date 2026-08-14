from datetime import date
from pydantic import BaseModel


class PatientCreate(BaseModel):
    aadhaar_number: str
    name: str
    phone: str
    dob: date | None = None
    gender: str | None = None
    height: float | None = None
    weight: float | None = None
    blood_group: str | None = None


class PatientUpdate(BaseModel):
    name: str | None = None
    phone: str | None = None
    dob: date | None = None
    gender: str | None = None
    height: float | None = None
    weight: float | None = None
    blood_group: str | None = None



class AddPatientToOrganization(BaseModel):
    organization_id: str
    patient_id: str

class AddDoctorPatient(BaseModel):
    doctor_id: str
    patient_id: str
    organization_id: str
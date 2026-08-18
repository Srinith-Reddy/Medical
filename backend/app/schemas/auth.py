from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    email: str
    password: str
    role: str
    staff_id: str | None = None
    patient_id: str | None = None
    organization_id: str | None = None
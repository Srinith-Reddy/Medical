from pydantic import BaseModel, EmailStr


class StaffCreate(BaseModel):
    organization_id: str
    name: str
    email: EmailStr
    password: str
    role: str
    specialization: str | None = None


class StaffResponse(BaseModel):
    id: str
    organization_id: str
    name: str
    email: EmailStr
    role: str
    specialization: str | None = None
    created_at: str | None = None
from pydantic import BaseModel


class OrganizationCreate(BaseModel):
    name: str
    type: str
    registration_no: str
    phone: str | None = None
    address: str | None = None
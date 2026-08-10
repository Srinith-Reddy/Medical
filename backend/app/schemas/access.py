from pydantic import BaseModel


class OTPRequest(BaseModel):
    appointment_id: str
    aadhaar_number: str


class OTPVerify(BaseModel):
    appointment_id: str
    otp: str
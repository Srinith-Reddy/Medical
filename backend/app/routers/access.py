from fastapi import APIRouter, HTTPException

from app.schemas.access import OTPRequest, OTPVerify
from app.services.access_service import AccessService


router = APIRouter(
    prefix="/access",
    tags=["Access"]
)


@router.post("/request-otp")
def request_otp(data: OTPRequest):
    try:
        return AccessService.request_otp(
            appointment_id=data.appointment_id,
            aadhaar_number=data.aadhaar_number
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/verify-otp")
def verify_otp(data: OTPVerify):
    try:
        return AccessService.verify_otp(
            appointment_id=data.appointment_id,
            otp=data.otp
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/check")
def check_access(
    patient_id: str,
    organization_id: str
):
    try:
        return AccessService.has_access(
            patient_id=patient_id,
            organization_id=organization_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
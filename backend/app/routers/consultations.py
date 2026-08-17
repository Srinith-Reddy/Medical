from fastapi import APIRouter, HTTPException

from app.schemas.consultation import ConsultationCreate
from app.services.consultation_service import ConsultationService


router = APIRouter(
    prefix="/consultations",
    tags=["Consultations"]
)


# --------------------------------------------------
# CREATE CONSULTATION
# --------------------------------------------------

@router.post("")
def create_consultation(
    data: ConsultationCreate
):

    try:

        return ConsultationService.create_consultation(
            appointment_id=data.appointment_id,
            patient_id=data.patient_id,
            staff_id=data.staff_id,
            organization_id=data.organization_id,
            diagnosis=data.diagnosis,
            notes=data.notes
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


# --------------------------------------------------
# GET CONSULTATION BY ID
# --------------------------------------------------

@router.get("/{consultation_id}")
def get_consultation(
    consultation_id: str
):

    try:

        return ConsultationService.get_consultation(
            consultation_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------------------------
# GET PATIENT CONSULTATIONS
# --------------------------------------------------

@router.get("/patient/{patient_id}")
def get_patient_consultations(
    patient_id: str
):

    try:

        return ConsultationService.get_patient_consultations(
            patient_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------------------------
# GET STAFF CONSULTATIONS
# --------------------------------------------------

@router.get("/staff/{staff_id}")
def get_staff_consultations(
    staff_id: str
):

    try:

        return ConsultationService.get_staff_consultations(
            staff_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
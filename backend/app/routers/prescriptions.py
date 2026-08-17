from fastapi import APIRouter, HTTPException

from app.schemas.prescription import PrescriptionCreate
from app.services.prescription_service import PrescriptionService


router = APIRouter(
    prefix="/prescriptions",
    tags=["Prescriptions"]
)


@router.post("")
def create_prescription(data: PrescriptionCreate):
    try:
        return PrescriptionService.create_prescription(
            patient_id=data.patient_id,
            organization_id=data.organization_id,
            staff_id=data.staff_id,
            consultation_id=data.consultation_id,
            medicines=[medicine.model_dump() for medicine in data.medicines],
            notes=data.notes,
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


@router.get("/doctor/{doctor_id}")
def get_prescriptions_by_doctor(doctor_id: str):
    try:
        return PrescriptionService.get_prescriptions_by_doctor(
            doctor_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )



@router.get("/patient/{patient_id}")
def get_patient_prescriptions(patient_id: str):
    try:
        return PrescriptionService.get_patient_prescriptions(patient_id)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )



@router.get("/{prescription_id}")
def get_prescription(prescription_id: str):
    try:
        return PrescriptionService.get_prescription(
            prescription_id
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
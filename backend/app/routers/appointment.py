from fastapi import APIRouter, HTTPException

from app.schemas.appointment import AppointmentCreate
from app.services.appointment_service import AppointmentService


router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)


@router.post("")
def create_appointment(data: AppointmentCreate):
    try:
        return AppointmentService.create_appointment(
            patient_id=data.patient_id,
            organization_id=data.organization_id,
            appointment_date=data.appointment_date,
            status=data.status
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
def get_appointments_by_doctor(doctor_id: str):
    try:
        return AppointmentService.get_appointments_by_doctor(
            doctor_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/{appointment_id}")
def get_appointment(appointment_id: str):
    try:
        return AppointmentService.get_appointment(
            appointment_id
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


@router.get("/patient/{patient_id}")
def get_patient_appointments(patient_id: str):
    try:
        return AppointmentService.get_patient_appointments(
            patient_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/organization/{organization_id}")
def get_organization_appointments(organization_id: str):
    try:
        return AppointmentService.get_organization_appointments(
            organization_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


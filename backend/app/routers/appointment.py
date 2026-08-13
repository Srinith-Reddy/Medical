from fastapi import APIRouter, HTTPException

from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentStatusUpdate
)

from app.services.appointment_service import AppointmentService


router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)


# --------------------------------------------------
# CREATE APPOINTMENT
# --------------------------------------------------

@router.post("")
def create_appointment(
    data: AppointmentCreate
):

    try:

        return AppointmentService.create_appointment(

            patient_id=data.patient_id,

            doctor_id=data.doctor_id,

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


# --------------------------------------------------
# GET APPOINTMENT BY ID
# --------------------------------------------------

@router.get("/{appointment_id}")
def get_appointment(
    appointment_id: str
):

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


# --------------------------------------------------
# GET PATIENT APPOINTMENTS
# --------------------------------------------------

@router.get("/patient/{patient_id}")
def get_patient_appointments(
    patient_id: str
):

    try:

        return AppointmentService.get_patient_appointments(
            patient_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------------------------
# GET ORGANIZATION APPOINTMENTS
# --------------------------------------------------

@router.get("/organization/{organization_id}")
def get_organization_appointments(
    organization_id: str
):

    try:

        return AppointmentService.get_organization_appointments(
            organization_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------------------------
# UPDATE APPOINTMENT STATUS
# --------------------------------------------------

@router.patch("/{appointment_id}/status")
def update_appointment_status(
    appointment_id: str,
    data: AppointmentStatusUpdate
):

    try:

        return AppointmentService.update_appointment_status(

            appointment_id=appointment_id,

            status=data.status

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
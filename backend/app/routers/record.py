from fastapi import APIRouter, HTTPException
from app.services.record_service import RecordService

router = APIRouter(
    prefix="/records",
    tags=["Records"]
)


@router.post("")
def create_record(
    patient_id: str,
    organization_id: str,
    staff_id: str,
    record_type: str,
    file_path: str,
    consultation_id: str | None = None
):
    try:
        return RecordService.create_record(
            patient_id=patient_id,
            organization_id=organization_id,
            staff_id=staff_id,
            record_type=record_type,
            file_path=file_path,
            consultation_id=consultation_id
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


@router.get("/patient/{patient_id}")
def get_patient_records(patient_id: str):
    try:
        return RecordService.get_patient_records(patient_id)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.get("/staff/{staff_id}")
def get_records_by_staff(staff_id: str):
    try:
        return RecordService.get_records_by_staff(staff_id)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/{record_id}/verify")
def verify_record(record_id: str):

    try:
        return RecordService.verify_record(record_id)

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


@router.get("/{record_id}")
def get_record(record_id: str):
    try:
        return RecordService.get_record(record_id)

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

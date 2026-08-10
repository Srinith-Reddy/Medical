from fastapi import APIRouter, HTTPException

from app.schemas.medicine import MedicineCreate
from app.services.medicine_service import MedicineService


router = APIRouter(
    prefix="/medicines",
    tags=["Medicines"]
)


@router.post("")
def create_medicine(data: MedicineCreate):
    try:
        return MedicineService.create_medicine(
            name=data.name,
            generic_name=data.generic_name,
            category=data.category,
            standard_dosage=data.standard_dosage,
            manufacturer=data.manufacturer,
            form=data.form,
            requires_rx=data.requires_rx
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


@router.get("")
def get_all_medicines():
    try:
        return MedicineService.get_all_medicines()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/search")
def search_medicines(search: str):
    try:
        return MedicineService.search_medicines(search)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/{medicine_id}")
def get_medicine(medicine_id: str):
    try:
        return MedicineService.get_medicine(medicine_id)

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
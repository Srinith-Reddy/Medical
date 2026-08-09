from fastapi import APIRouter, HTTPException

from app.schemas.staff import StaffCreate
from app.services.staff_service import StaffService


router = APIRouter(
    prefix="/staff",
    tags=["Staff"]
)


@router.post("/")
def create_staff(staff: StaffCreate):

    try:
        result = StaffService.create_staff(
            organization_id=staff.organization_id,
            name=staff.name,
            email=staff.email,
            password=staff.password,
            role=staff.role,
            specialization=staff.specialization,
        )

        return {
            "message": "Staff created successfully",
            "staff": result[0]
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get("/organization/{organization_id}")
def get_staff_by_organization(
    organization_id: str
):

    return StaffService.get_staff_by_organization(
        organization_id
    )


@router.get("/organization/{organization_id}/doctors")
def get_doctors(
    organization_id: str
):

    return StaffService.get_doctors_by_organization(
        organization_id
    )


@router.get("/{staff_id}")
def get_staff(staff_id: str):

    try:
        return StaffService.get_staff_by_id(staff_id)

    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Staff member not found"
        )
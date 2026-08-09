from fastapi import APIRouter, HTTPException

from app.schemas.organization import OrganizationCreate
from app.services.organization_service import OrganizationService


router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"]
)


@router.post("/")
def create_organization(
    organization: OrganizationCreate
):
    try:
        result = OrganizationService.create_organization(
            name=organization.name,
            organization_type=organization.type,
            registration_no=organization.registration_no,
            phone=organization.phone,
            address=organization.address,
        )

        return result[0]

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get("/")
def get_all_organizations():
    return OrganizationService.get_all_organizations()


@router.get("/by-type")
def get_organizations_by_type(
    type: str
):
    return OrganizationService.get_organizations_by_type(
        type
    )


@router.get("/{organization_id}")
def get_organization(
    organization_id: str
):
    try:
        return OrganizationService.get_organization_by_id(
            organization_id
        )

    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )


@router.get("/by-registration/{registration_no}")
def get_organization_by_registration(
    registration_no: str
):
    try:
        return OrganizationService.get_organization_by_registration_no(
            registration_no
        )

    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )
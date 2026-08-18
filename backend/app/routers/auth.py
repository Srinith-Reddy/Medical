from fastapi import APIRouter, HTTPException

from app.schemas.auth import LoginRequest, UserCreate
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserCreate):
    try:
        return AuthService.register_user(
            email=user.email,
            password=user.password,
            role=user.role,
            staff_id=user.staff_id,
            patient_id=user.patient_id,
            organization_id=user.organization_id
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


@router.post("/login")
def login(data: LoginRequest):
    try:
        return AuthService.login(
            email=data.email,
            password=data.password
        )

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
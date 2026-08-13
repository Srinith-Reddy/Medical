from fastapi import APIRouter, HTTPException

from app.schemas.patient import PatientCreate, PatientUpdate
from app.services.patient_service import PatientService


router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)


'''@router.post("/")
def create_patient(patient: PatientCreate):
    try:
        result = PatientService.create_patient(
            aadhaar_number=patient.aadhaar_number,
            name=patient.name,
            phone=patient.phone,
            dob=patient.dob.isoformat() if patient.dob else None,
            gender=patient.gender,
            height=patient.height,
            weight=patient.weight,
            blood_group=patient.blood_group,
        )

        return result[0]

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get("/{patient_id}")
def get_patient(patient_id: str):
    try:
        return PatientService.get_patient_by_id(patient_id)

    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )


@router.get("/")
def get_all_patients():
    return PatientService.get_all_patients()


@router.get("/search/by-name")
def search_patients(name: str):
    return PatientService.search_patients_by_name(name)


@router.patch("/{patient_id}")
def update_patient(
    patient_id: str,
    patient: PatientUpdate
):
    updates = patient.model_dump(exclude_none=True)

    if not updates:
        raise HTTPException(
            status_code=400,
            detail="No fields provided to update"
        )

    if "dob" in updates:
        updates["dob"] = updates["dob"].isoformat()

    result = PatientService.update_patient(
        patient_id,
        updates
    )

    @router.get("/organization/{organization_id}")
    def get_patients_by_organization(organization_id: str):

        return PatientService.get_patients_by_organization(
            organization_id
        )

    return result[0]'''


@router.post("/")
def create_patient(patient: PatientCreate):
    try:
        result = PatientService.create_patient(
            aadhaar_number=patient.aadhaar_number,
            name=patient.name,
            phone=patient.phone,
            dob=patient.dob.isoformat() if patient.dob else None,
            gender=patient.gender,
            height=patient.height,
            weight=patient.weight,
            blood_group=patient.blood_group,
        )

        return result[0]

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get("/")
def get_all_patients():
    return PatientService.get_all_patients()


@router.get("/search/by-name")
def search_patients(name: str):
    return PatientService.search_patients_by_name(name)


@router.get("/organization/{organization_id}")
def get_patients_by_organization(organization_id: str):
    return PatientService.get_patients_by_organization(
        organization_id
    )


@router.get("/{patient_id}")
def get_patient(patient_id: str):
    try:
        return PatientService.get_patient_by_id(patient_id)

    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )


@router.patch("/{patient_id}")
def update_patient(
    patient_id: str,
    patient: PatientUpdate
):
    updates = patient.model_dump(exclude_none=True)

    if not updates:
        raise HTTPException(
            status_code=400,
            detail="No fields provided to update"
        )

    if "dob" in updates:
        updates["dob"] = updates["dob"].isoformat()

    result = PatientService.update_patient(
        patient_id,
        updates
    )

    return result[0]
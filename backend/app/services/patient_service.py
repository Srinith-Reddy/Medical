from typing import Optional

from app.db.supabase import supabase


class PatientService:

    @staticmethod
    def create_patient(
        aadhaar_number: str,
        name: str,
        phone: str,
        dob: Optional[str] = None,
        gender: Optional[str] = None,
        height: Optional[float] = None,
        weight: Optional[float] = None,
        blood_group: Optional[str] = None,
    ):
        data = {
            "aadhaar_number": aadhaar_number,
            "name": name,
            "phone": phone,
            "dob": dob,
            "gender": gender,
            "height": height,
            "weight": weight,
            "blood_group": blood_group,
        }

        response = (
            supabase
            .table("patients")
            .insert(data)
            .execute()
        )

        return response.data

    @staticmethod
    def get_patient_by_id(patient_id: str):
        response = (
            supabase
            .table("patients")
            .select("*")
            .eq("id", patient_id)
            .single()
            .execute()
        )

        return response.data

    @staticmethod
    def get_patient_by_aadhaar(aadhaar_number: str):
        response = (
            supabase
            .table("patients")
            .select("*")
            .eq("aadhaar_number", aadhaar_number)
            .single()
            .execute()
        )

        return response.data

    @staticmethod
    def search_patients_by_name(name: str):
        response = (
            supabase
            .table("patients")
            .select("*")
            .ilike("name", f"%{name}%")
            .execute()
        )

        return response.data

    @staticmethod
    def update_patient(
        patient_id: str,
        updates: dict
    ):
        response = (
            supabase
            .table("patients")
            .update(updates)
            .eq("id", patient_id)
            .execute()
        )

        return response.data

    @staticmethod
    def get_all_patients():
        response = (
            supabase
            .table("patients")
            .select("*")
            .execute()
        )

        return response.data

    @staticmethod
    def get_patients_by_organization(organization_id: str):

        response = (
            supabase
            .table("organization_patients")
            .select("patient_id, patients(*)")
            .eq("organization_id", organization_id)
            .execute()
        )

        return [
            row["patients"]
            for row in response.data
        ]

    @staticmethod
    def add_patient_to_organization(
        organization_id: str,
        patient_id: str
    ):
        relationship = {
            "organization_id": organization_id,
            "patient_id": patient_id
        }

        response = (
            supabase
            .table("organization_patients")
            .insert(relationship)
            .execute()
        )

        if not response.data:
            raise ValueError(
                "Failed to add patient to organization"
            )

        return response.data[0]


    @staticmethod
    def add_patient_to_doctor(
        doctor_id: str,
        patient_id: str,
        organization_id: str
    ):
        # 1. Verify doctor exists and belongs to organization
        doctor_response = (
            supabase
            .table("staff")
            .select("id, organization_id, role")
            .eq("id", doctor_id)
            .single()
            .execute()
        )

        if not doctor_response.data:
            raise ValueError("Doctor not found")

        doctor = doctor_response.data

        if doctor["organization_id"] != organization_id:
            raise ValueError(
                "Doctor does not belong to this organization"
            )

        if doctor["role"] != "DOCTOR":
            raise ValueError(
                "Specified staff member is not a doctor"
            )

        # 2. Verify patient belongs to organization
        patient_org_response = (
            supabase
            .table("organization_patients")
            .select("id")
            .eq("organization_id", organization_id)
            .eq("patient_id", patient_id)
            .execute()
        )

        if not patient_org_response.data:
            raise ValueError(
                "Patient does not belong to this organization"
            )

        # 3. Check duplicate
        existing_response = (
            supabase
            .table("doctor_patients")
            .select("id")
            .eq("doctor_id", doctor_id)
            .eq("patient_id", patient_id)
            .execute()
        )

        if existing_response.data:
            raise ValueError(
                "Patient is already associated with this doctor"
            )

        # 4. Create relationship
        relationship = {
            "doctor_id": doctor_id,
            "patient_id": patient_id,
            "organization_id": organization_id
        }

        response = (
            supabase
            .table("doctor_patients")
            .insert(relationship)
            .execute()
        )

        if not response.data:
            raise ValueError(
                "Failed to associate patient with doctor"
            )

        return response.data[0]

    @staticmethod
    def get_patients_by_doctor(doctor_id: str):

        response = (
            supabase
            .table("doctor_patients")
            .select("patient_id, patients(*)")
            .eq("doctor_id", doctor_id)
            .execute()
        )

        return [
            row["patients"]
            for row in response.data
        ]

    @staticmethod
    def remove_patient_from_doctor(
        doctor_id: str,
        patient_id: str
    ):

        response = (
            supabase
            .table("doctor_patients")
            .delete()
            .eq("doctor_id", doctor_id)
            .eq("patient_id", patient_id)
            .execute()
        )

        if not response.data:
            raise ValueError(
                "Doctor-patient relationship not found"
            )

        return {
            "message": "Patient removed from doctor",
            "doctor_id": doctor_id,
            "patient_id": patient_id
        }

    
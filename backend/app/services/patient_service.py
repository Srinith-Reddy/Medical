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
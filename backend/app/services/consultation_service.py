from app.db.supabase import supabase


class ConsultationService:

    @staticmethod
    def create_consultation(
        patient_id: str,
        staff_id: str,
        organization_id: str,
        appointment_id: str,
        diagnosis: str,
        notes: str
    ):
        consultation_data = {
            "patient_id": patient_id,
            "staff_id": staff_id,
            "organization_id": organization_id,
            "appointment_id": appointment_id,
            "diagnosis": diagnosis,
            "notes": notes
        }

        response = (
            supabase
            .table("consultations")
            .insert(consultation_data)
            .execute()
        )

        if not response.data:
            raise ValueError("Failed to create consultation")

        return response.data[0]

    @staticmethod
    def get_consultation(consultation_id: str):
        response = (
            supabase
            .table("consultations")
            .select("*")
            .eq("id", consultation_id)
            .single()
            .execute()
        )

        if not response.data:
            raise ValueError("Consultation not found")

        return response.data

    @staticmethod
    def get_patient_consultations(patient_id: str):
        response = (
            supabase
            .table("consultations")
            .select("*")
            .eq("patient_id", patient_id)
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    @staticmethod
    def get_staff_consultations(staff_id: str):
        response = (
            supabase
            .table("consultations")
            .select("*")
            .eq("staff_id", staff_id)
            .order("created_at", desc=True)
            .execute()
        )

        return response.data
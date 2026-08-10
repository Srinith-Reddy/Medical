from app.db.supabase import supabase


class RecordService:

    @staticmethod
    def create_record(
        patient_id: str,
        organization_id: str,
        staff_id: str,
        record_type: str,
        file_path: str,
        consultation_id: str = None
    ):
        record_data = {
            "patient_id": patient_id,
            "organization_id": organization_id,
            "staff_id": staff_id,
            "record_type": record_type,
            "file_path": file_path
        }

        if consultation_id:
            record_data["consultation_id"] = consultation_id

        response = (
            supabase
            .table("records")
            .insert(record_data)
            .execute()
        )

        if not response.data:
            raise ValueError("Failed to create medical record")

        return response.data[0]

    @staticmethod
    def get_record(record_id: str):
        response = (
            supabase
            .table("records")
            .select("*")
            .eq("id", record_id)
            .single()
            .execute()
        )

        if not response.data:
            raise ValueError("Record not found")

        return response.data

    @staticmethod
    def get_patient_records(patient_id: str):
        response = (
            supabase
            .table("records")
            .select("*")
            .eq("patient_id", patient_id)
            .order("created_at", desc=True)
            .execute()
        )

        return response.data
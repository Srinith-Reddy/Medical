from app.db.supabase import supabase
import hashlib
from app.services.blockchain_service import BlockchainService



class RecordService:
    @staticmethod
    def calculate_file_hash(file_path: str) -> str:
        sha256 = hashlib.sha256()

        with open(file_path, "rb") as file:
            while chunk := file.read(4096):
                sha256.update(chunk)

        return sha256.hexdigest()

    @staticmethod
    def create_record(
        patient_id: str,
        organization_id: str,
        staff_id: str,
        record_type: str,
        file_path: str,
        consultation_id: str = None
    ):
        file_hash = RecordService.calculate_file_hash(file_path)
        blockchain_tx_hash = BlockchainService.store_hash(
            file_hash
        )

        record_data = {
            "patient_id": patient_id,
            "organization_id": organization_id,
            "staff_id": staff_id,
            "record_type": record_type,
            "file_path": file_path,
            "file_hash": file_hash,
            "blockchain_tx_hash": blockchain_tx_hash
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
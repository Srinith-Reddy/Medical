from app.services.record_service import RecordService
from app.db.supabase import supabase


class PrescriptionService:

    @staticmethod
    def create_prescription(
        patient_id: str,
        organization_id: str,
        staff_id: str,
        medicines: list,
        consultation_id: str = None
    ):
        # 1. Create a medical record for the prescription
        record = RecordService.create_record(
            patient_id=patient_id,
            organization_id=organization_id,
            staff_id=staff_id,
            record_type="PRESCRIPTION",
            consultation_id=consultation_id
        )

        record_id = record["id"]

        # 2. Prepare prescription medicines
        prescription_items = []

        for medicine in medicines:
            prescription_items.append({
                "record_id": record_id,
                "medicine_id": medicine["medicine_id"],
                "dosage": medicine["dosage"],
                "quantity": medicine["quantity"],
                "instructions": medicine["instructions"]
            })

        # 3. Add medicines to prescription
        items_response = (
            supabase
            .table("prescription_items")
            .insert(prescription_items)
            .execute()
        )

        if not items_response.data:
            raise ValueError(
                "Failed to add prescription medicines"
            )

        # 4. Return complete prescription
        return {
            "prescription": record,
            "medicines": items_response.data
        }
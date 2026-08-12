from app.db.supabase import supabase
from app.services.pdf_service import PDFService
from app.services.record_service import RecordService


class PrescriptionService:

    @staticmethod
    def create_prescription(
        patient_id: str,
        organization_id: str,
        staff_id: str,
        consultation_id: str,
        medicines: list,
        notes: str | None = None

    ):
        # 1. Create prescription
        prescription_data = {
            "patient_id": patient_id,
            "organization_id": organization_id,
            "staff_id": staff_id,
            "consultation_id": consultation_id,
            "notes": notes
            
        }

        prescription_response = (
            supabase
            .table("prescriptions")
            .insert(prescription_data)
            .execute()
        )

        if not prescription_response.data:
            raise ValueError("Failed to create prescription")

        prescription = prescription_response.data[0]
        prescription_id = prescription["id"]

        # 2. Add medicines
        prescription_items = []

        for medicine in medicines:
            prescription_items.append({
                "prescription_id": prescription_id,
                "medicine_id": medicine["medicine_id"],
                "dosage": medicine["dosage"],
                "quantity": medicine["quantity"],
                "instructions": medicine["instructions"]
            })

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

        complete_prescription = {
            "prescription": prescription,
            "medicines": items_response.data
        }

        file_path = (
            f"generated_records/"
            f"prescription_{prescription_id}.pdf"
        )

        PDFService.generate_prescription_pdf(
            complete_prescription,
            file_path
        )

        record = RecordService.create_record(
            patient_id=patient_id,
            organization_id=organization_id,
            staff_id=staff_id,
            consultation_id=consultation_id,
            record_type="PRESCRIPTION",
            file_path=file_path
        )

        # 3. Return complete prescription
        return {
            "prescription": prescription,
            "medicines": items_response.data,
            "record": record
        }

    @staticmethod
    def get_prescription(prescription_id: str):
        # Get prescription
        prescription_response = (
            supabase
            .table("prescriptions")
            .select("*")
            .eq("id", prescription_id)
            .single()
            .execute()
        )

        if not prescription_response.data:
            raise ValueError("Prescription not found")

        prescription = prescription_response.data

        # Get medicines belonging to this prescription
        items_response = (
            supabase
            .table("prescription_items")
            .select("*")
            .eq("prescription_id", prescription_id)
            .execute()
        )

        return {
        "prescription": prescription,
        "medicines": items_response.data
        }
    @staticmethod
    def get_patient_prescriptions(patient_id: str):
        prescriptions_response = (
            supabase
            .table("prescriptions")
            .select("*")
            .eq("patient_id", patient_id)
            .order("created_at", desc=True)
            .execute()
        )

        prescriptions = prescriptions_response.data

        result = []

        for prescription in prescriptions:
            prescription_id = prescription["id"]

            items_response = (
                supabase
                .table("prescription_items")
                .select("*")
                .eq("prescription_id", prescription_id)
                .execute()
            )

            result.append({
                "prescription": prescription,
                "medicines": items_response.data
            })

        return result
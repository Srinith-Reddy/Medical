from app.db.supabase import supabase


class PrescriptionService:

    @staticmethod
    def create_prescription(
        patient_id: str,
        organization_id: str,
        staff_id: str,
        consultation_id: str,
        medicines: list
    ):
        # 1. Create prescription
        prescription_data = {
            "patient_id": patient_id,
            "organization_id": organization_id,
            "staff_id": staff_id,
            "consultation_id": consultation_id
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

        # 3. Return complete prescription
        return {
            "prescription": prescription,
            "medicines": items_response.data
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
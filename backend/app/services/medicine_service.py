from app.db.supabase import supabase


class MedicineService:

    @staticmethod
    def create_medicine(
        name: str,
        generic_name: str,
        category: str,
        standard_dosage: str,
        manufacturer: str,
        form: str,
        requires_rx: bool
    ):
        medicine_data = {
            "name": name,
            "generic_name": generic_name,
            "category": category,
            "standard_dosage": standard_dosage,
            "manufacturer": manufacturer,
            "form": form,
            "requires_rx": requires_rx
        }

        response = (
            supabase
            .table("medicines")
            .insert(medicine_data)
            .execute()
        )

        if not response.data:
            raise ValueError("Failed to create medicine")

        return response.data[0]

    @staticmethod
    def get_medicine(medicine_id: str):
        response = (
            supabase
            .table("medicines")
            .select("*")
            .eq("id", medicine_id)
            .single()
            .execute()
        )

        if not response.data:
            raise ValueError("Medicine not found")

        return response.data

    @staticmethod
    def get_all_medicines():
        response = (
            supabase
            .table("medicines")
            .select("*")
            .order("name")
            .execute()
        )

        return response.data

    @staticmethod
    def search_medicines(search: str):
        response = (
            supabase
            .table("medicines")
            .select("*")
            .ilike("name", f"%{search}%")
            .execute()
        )

        return response.data
from app.db.supabase import supabase


class OrganizationService:

    @staticmethod
    def create_organization(
        name: str,
        organization_type: str,
        registration_number: str,
        address: str | None = None,
        phone: str | None = None,
    ):
        data = {
            "name": name,
            "type": organization_type,
            "registration_number": registration_number,
            "address": address,
            "phone": phone,
        }

        response = (
            supabase
            .table("organizations")
            .insert(data)
            .execute()
        )

        return response.data

    @staticmethod
    def get_organization_by_id(organization_id: str):
        response = (
            supabase
            .table("organizations")
            .select("*")
            .eq("id", organization_id)
            .single()
            .execute()
        )

        return response.data

    @staticmethod
    def get_organization_by_registration_number(
        registration_number: str
    ):
        response = (
            supabase
            .table("organizations")
            .select("*")
            .eq(
                "registration_number",
                registration_number
            )
            .single()
            .execute()
        )

        return response.data

    @staticmethod
    def get_all_organizations():
        response = (
            supabase
            .table("organizations")
            .select("*")
            .execute()
        )

        return response.data
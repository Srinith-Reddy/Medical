from app.db.supabase import supabase


class OrganizationService:

    @staticmethod
    def create_organization(
        name: str,
        organization_type: str,
        registration_no: str,
        address: str | None = None,
        phone: str | None = None,
    ):
        data = {
            "name": name,
            "type": organization_type,
            "registration_no": registration_no,
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
    def get_organization_by_registration_no(
        registration_no: str
    ):
        response = (
            supabase
            .table("organizations")
            .select("*")
            .eq(
                "registration_no",
                registration_no
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
    @staticmethod
    def get_organizations_by_type(
        organization_type: str
    ):
        response = (
            supabase
            .table("organizations")
            .select("*")
            .eq("type", organization_type)
            .execute()
        )

        return response.data
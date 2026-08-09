import bcrypt

from app.db.supabase import supabase


class StaffService:

    @staticmethod
    def create_staff(
        organization_id: str,
        name: str,
        email: str,
        password: str,
        role: str,
        specialization: str | None = None,
    ):
        password_hash = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        data = {
            "organization_id": organization_id,
            "name": name,
            "email": email,
            "password_hash": password_hash,
            "role": role,
            "specialization": specialization,
        }

        response = (
            supabase
            .table("staff")
            .insert(data)
            .execute()
        )

        return response.data

    @staticmethod
    def get_staff_by_id(staff_id: str):

        response = (
            supabase
            .table("staff")
            .select(
                "id, organization_id, name, email, "
                "role, public_key, specialization, created_at"
            )
            .eq("id", staff_id)
            .single()
            .execute()
        )

        return response.data

    @staticmethod
    def get_staff_by_organization(
        organization_id: str
    ):

        response = (
            supabase
            .table("staff")
            .select(
                "id, organization_id, name, email, "
                "role, public_key, specialization, created_at"
            )
            .eq("organization_id", organization_id)
            .execute()
        )

        return response.data

    @staticmethod
    def get_doctors_by_organization(
        organization_id: str
    ):

        response = (
            supabase
            .table("staff")
            .select(
                "id, organization_id, name, email, "
                "role, public_key, specialization, created_at"
            )
            .eq("organization_id", organization_id)
            .eq("role", "DOCTOR")
            .execute()
        )

        return response.data
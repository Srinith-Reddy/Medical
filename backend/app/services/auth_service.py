import bcrypt

from app.db.supabase import supabase


class AuthService:

    @staticmethod
    def hash_password(password: str) -> str:
        return bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

    @staticmethod
    def verify_password(
        password: str,
        password_hash: str
    ) -> bool:

        return bcrypt.checkpw(
            password.encode("utf-8"),
            password_hash.encode("utf-8")
        )

    @staticmethod
    def register_user(
        email: str,
        password: str,
        role: str,
        staff_id: str | None = None,
        patient_id: str | None = None,
        organization_id: str | None = None
    ):

        role = role.upper()

        if role not in ["DOCTOR", "PATIENT", "ORGANIZATION"]:
            raise ValueError("Invalid role")

        if role == "DOCTOR" and not staff_id:
            raise ValueError("Doctor must have staff_id")

        if role == "PATIENT" and not patient_id:
            raise ValueError("Patient must have patient_id")

        if role == "ORGANIZATION" and not organization_id:
            raise ValueError("Organization must have organization_id")

        existing = (
            supabase
            .table("users")
            .select("id")
            .eq("email", email)
            .execute()
        )

        if existing.data:
            raise ValueError("Email already registered")

        password_hash = AuthService.hash_password(password)

        user_data = {
            "email": email,
            "password_hash": password_hash,
            "role": role,
            "staff_id": staff_id,
            "patient_id": patient_id,
            "organization_id": organization_id
        }

        response = (
            supabase
            .table("users")
            .insert(user_data)
            .execute()
        )

        if not response.data:
            raise ValueError("Failed to create user")

        user = response.data[0]

        return {
            "id": user["id"],
            "email": user["email"],
            "role": user["role"],
            "staff_id": user["staff_id"],
            "patient_id": user["patient_id"],
            "organization_id": user["organization_id"]
        }

    @staticmethod
    def login(
        email: str,
        password: str
    ):

        response = (
            supabase
            .table("users")
            .select("*")
            .eq("email", email)
            .single()
            .execute()
        )

        if not response.data:
            raise ValueError("Invalid email or password")

        user = response.data

        if not AuthService.verify_password(
            password,
            user["password_hash"]
        ):
            raise ValueError("Invalid email or password")

        return {
            "id": user["id"],
            "email": user["email"],
            "role": user["role"],
            "staff_id": user["staff_id"],
            "patient_id": user["patient_id"],
            "organization_id": user["organization_id"]
        }
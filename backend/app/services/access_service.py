import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from app.db.supabase import supabase


class AccessService:

    @staticmethod
    def hash_otp(otp: str) -> str:
        return hashlib.sha256(otp.encode()).hexdigest()

    @staticmethod
    def request_otp(
        appointment_id: str,
        aadhaar_number: str
    ):
        appointment_response = (
            supabase
            .table("appointments")
            .select("*")
            .eq("id", appointment_id)
            .single()
            .execute()
        )

        if not appointment_response.data:
            raise ValueError("Appointment not found")

        appointment = appointment_response.data

        patient_id = appointment["patient_id"]
        organization_id = appointment["organization_id"]

        # 2. Get patient
        patient_response = (
            supabase
            .table("patients")
            .select("*")
            .eq("id", patient_id)
            .single()
            .execute()
        )

        if not patient_response.data:
            raise ValueError("Patient not found")

        patient = patient_response.data

        # 3. Verify Aadhaar
        if patient["aadhaar_number"] != aadhaar_number:
            raise ValueError("Invalid Aadhaar number")

        # 4. Generate 6-digit OTP
        otp = str(secrets.randbelow(900000) + 100000)

        # 5. Hash OTP before storing
        otp_hash = AccessService.hash_otp(otp)

        # 6. OTP expires in 5 minutes
        expires_at = (
            datetime.now(timezone.utc)
            + timedelta(minutes=5)
        )

        verification_data = {
            "patient_id": patient_id,
            "organization_id": organization_id,
            "appointment_id": appointment_id,
            "otp_hash": otp_hash,
            "otp_expires_at": expires_at.isoformat()
        }

        # 7. Store OTP verification
        response = (
            supabase
            .table("access_verifications")
            .insert(verification_data)
            .execute()
        )

        if not response.data:
            raise ValueError("Failed to create OTP verification")

        # DEMO ONLY
        # Later this OTP will be sent through SMS.
        return {
            "message": "OTP generated successfully",
            "appointment_id": appointment_id,
            "demo_otp": otp,
            "expires_at": expires_at.isoformat()
        }

    # ---------------------------------------------------------
    # 2. VERIFY OTP
    # ---------------------------------------------------------
    @staticmethod
    def verify_otp(
        appointment_id: str,
        otp: str
    ):
        # 1. Get latest OTP verification
        response = (
            supabase
            .table("access_verifications")
            .select("*")
            .eq("appointment_id", appointment_id)
            .order("created_at", desc=True)
            .limit(1)
            .execute()
        )

        if not response.data:
            raise ValueError("No OTP request found")

        verification = response.data[0]

        # 2. Check if OTP has expired
        expires_at = datetime.fromisoformat(
            verification["otp_expires_at"].replace("Z", "+00:00")
        )

        if datetime.now(timezone.utc) > expires_at:
            raise ValueError("OTP has expired")

        # 3. Hash entered OTP
        entered_hash = AccessService.hash_otp(otp)

        # 4. Compare hashes
        if entered_hash != verification["otp_hash"]:
            raise ValueError("Invalid OTP")

        patient_id = verification["patient_id"]
        organization_id = verification["organization_id"]

        # 5. Mark OTP as verified
        (
            supabase
            .table("access_verifications")
            .update({
                "verified_at": datetime.now(timezone.utc).isoformat()
            })
            .eq("id", verification["id"])
            .execute()
        )

        # 6. Grant access for 3 hours
        granted_at = datetime.now(timezone.utc)

        expires_at = granted_at + timedelta(hours=3)

        grant_data = {
            "patient_id": patient_id,
            "organization_id": organization_id,
            "granted_at": granted_at.isoformat(),
            "expires_at": expires_at.isoformat(),
            "revoked": False,
            "is_emergency": False
        }

        grant_response = (
            supabase
            .table("access_grants")
            .insert(grant_data)
            .execute()
        )

        if not grant_response.data:
            raise ValueError("Failed to grant access")

        return {
            "message": "Access granted successfully",
            "patient_id": patient_id,
            "organization_id": organization_id,
            "expires_at": expires_at.isoformat()
        }

    # ---------------------------------------------------------
    # 3. CHECK ACCESS
    # ---------------------------------------------------------
    @staticmethod
    def has_access(
        patient_id: str,
        organization_id: str
    ):
        now = datetime.now(timezone.utc).isoformat()

        response = (
            supabase
            .table("access_grants")
            .select("*")
            .eq("patient_id", patient_id)
            .eq("organization_id", organization_id)
            .eq("revoked", False)
            .gt("expires_at", now)
            .order("expires_at", desc=True)
            .limit(1)
            .execute()
        )

        if not response.data:
            return {
                "has_access": False
            }

        grant = response.data[0]

        return {
            "has_access": True,
            "patient_id": patient_id,
            "organization_id": organization_id,
            "expires_at": grant["expires_at"]
        }
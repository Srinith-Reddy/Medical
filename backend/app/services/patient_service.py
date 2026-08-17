from typing import Optional

from app.db.supabase import supabase


class PatientService:

    # --------------------------------------------------
    # CREATE PATIENT
    # --------------------------------------------------

    @staticmethod
    def create_patient(
        aadhaar_number: str,
        name: str,
        phone: str,
        dob: Optional[str] = None,
        gender: Optional[str] = None,
        height: Optional[float] = None,
        weight: Optional[float] = None,
        blood_group: Optional[str] = None,
    ):

        data = {
            "aadhaar_number": aadhaar_number,
            "name": name,
            "phone": phone,
            "dob": dob,
            "gender": gender,
            "height": height,
            "weight": weight,
            "blood_group": blood_group,
        }

        response = (
            supabase
            .table("patients")
            .insert(data)
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # GET PATIENT BY ID
    # --------------------------------------------------

    @staticmethod
    def get_patient_by_id(patient_id: str):

        response = (
            supabase
            .table("patients")
            .select("*")
            .eq("id", patient_id)
            .single()
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # GET PATIENT BY AADHAAR
    # --------------------------------------------------

    @staticmethod
    def get_patient_by_aadhaar(
        aadhaar_number: str
    ):

        response = (
            supabase
            .table("patients")
            .select("*")
            .eq(
                "aadhaar_number",
                aadhaar_number
            )
            .single()
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # SEARCH PATIENTS
    # --------------------------------------------------

    @staticmethod
    def search_patients_by_name(
        name: str
    ):

        response = (
            supabase
            .table("patients")
            .select("*")
            .ilike(
                "name",
                f"%{name}%"
            )
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # UPDATE PATIENT
    # --------------------------------------------------

    @staticmethod
    def update_patient(
        patient_id: str,
        updates: dict
    ):

        response = (
            supabase
            .table("patients")
            .update(updates)
            .eq(
                "id",
                patient_id
            )
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # GET ALL PATIENTS
    # --------------------------------------------------

    @staticmethod
    def get_all_patients():

        response = (
            supabase
            .table("patients")
            .select("*")
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # GET PATIENTS BY ORGANIZATION
    # --------------------------------------------------

    @staticmethod
    def get_patients_by_organization(
        organization_id: str
    ):

        response = (
            supabase
            .table("organization_patients")
            .select("patient_id")
            .eq(
                "organization_id",
                organization_id
            )
            .execute()
        )

        patient_ids = [
            row["patient_id"]
            for row in response.data
        ]

        if not patient_ids:
            return []

        patients_response = (
            supabase
            .table("patients")
            .select("*")
            .in_(
                "id",
                patient_ids
            )
            .execute()
        )

        return patients_response.data


    # --------------------------------------------------
    # ADD PATIENT TO ORGANIZATION
    # --------------------------------------------------

    @staticmethod
    def add_patient_to_organization(
        organization_id: str,
        patient_id: str
    ):

        # Check patient exists

        patient_response = (
            supabase
            .table("patients")
            .select("id")
            .eq(
                "id",
                patient_id
            )
            .single()
            .execute()
        )

        if not patient_response.data:
            raise ValueError(
                "Patient not found"
            )


        # Check if already associated

        existing_response = (
            supabase
            .table("organization_patients")
            .select("id")
            .eq(
                "organization_id",
                organization_id
            )
            .eq(
                "patient_id",
                patient_id
            )
            .execute()
        )

        if existing_response.data:

            return existing_response.data[0]


        relationship = {
            "organization_id": organization_id,
            "patient_id": patient_id
        }


        response = (
            supabase
            .table("organization_patients")
            .insert(relationship)
            .execute()
        )

        if not response.data:
            raise ValueError(
                "Failed to add patient to organization"
            )

        return response.data[0]


    # --------------------------------------------------
    # ADD PATIENT TO DOCTOR
    # --------------------------------------------------

    @staticmethod
    def add_patient_to_doctor(
        doctor_id: str,
        patient_id: str,
        organization_id: str
    ):

        # --------------------------------------------------
        # 1. VERIFY DOCTOR
        # --------------------------------------------------

        doctor_response = (
            supabase
            .table("staff")
            .select(
                "id, organization_id, role"
            )
            .eq(
                "id",
                doctor_id
            )
            .single()
            .execute()
        )

        if not doctor_response.data:
            raise ValueError(
                "Doctor not found"
            )

        doctor = doctor_response.data


        if doctor["organization_id"] != organization_id:

            raise ValueError(
                "Doctor does not belong to this organization"
            )


        if doctor["role"] != "DOCTOR":

            raise ValueError(
                "Specified staff member is not a doctor"
            )


        # --------------------------------------------------
        # 2. VERIFY PATIENT
        # --------------------------------------------------

        patient_response = (
            supabase
            .table("patients")
            .select("id")
            .eq(
                "id",
                patient_id
            )
            .single()
            .execute()
        )

        if not patient_response.data:

            raise ValueError(
                "Patient not found"
            )


        # --------------------------------------------------
        # 3. MAKE SURE PATIENT BELONGS TO ORGANIZATION
        # --------------------------------------------------

        organization_patient_response = (
            supabase
            .table("organization_patients")
            .select("id")
            .eq(
                "organization_id",
                organization_id
            )
            .eq(
                "patient_id",
                patient_id
            )
            .execute()
        )


        # If the patient is not yet associated with
        # the organization, create that relationship.

        if not organization_patient_response.data:

            organization_relationship = {
                "organization_id": organization_id,
                "patient_id": patient_id
            }

            organization_response = (
                supabase
                .table("organization_patients")
                .insert(
                    organization_relationship
                )
                .execute()
            )

            if not organization_response.data:

                raise ValueError(
                    "Failed to associate patient with organization"
                )


        # --------------------------------------------------
        # 4. CHECK DOCTOR-PATIENT DUPLICATE
        # --------------------------------------------------

        existing_response = (
            supabase
            .table("doctor_patients")
            .select("id")
            .eq(
                "doctor_id",
                doctor_id
            )
            .eq(
                "patient_id",
                patient_id
            )
            .execute()
        )

        if existing_response.data:

            return existing_response.data[0]


        # --------------------------------------------------
        # 5. CREATE DOCTOR-PATIENT RELATIONSHIP
        # --------------------------------------------------

        relationship = {
            "doctor_id": doctor_id,
            "patient_id": patient_id,
            "organization_id": organization_id
        }


        response = (
            supabase
            .table("doctor_patients")
            .insert(
                relationship
            )
            .execute()
        )


        if not response.data:

            raise ValueError(
                "Failed to associate patient with doctor"
            )


        return response.data[0]


    # --------------------------------------------------
    # GET PATIENTS BY DOCTOR
    # --------------------------------------------------

    @staticmethod
    def get_patients_by_doctor(
        doctor_id: str
    ):

        # First get the relationships.

        relationship_response = (
            supabase
            .table("doctor_patients")
            .select("patient_id")
            .eq(
                "doctor_id",
                doctor_id
            )
            .execute()
        )


        patient_ids = [
            row["patient_id"]
            for row in relationship_response.data
        ]


        if not patient_ids:

            return []


        # Then get the actual patient records.

        patients_response = (
            supabase
            .table("patients")
            .select("*")
            .in_(
                "id",
                patient_ids
            )
            .execute()
        )


        return patients_response.data


    # --------------------------------------------------
    # REMOVE PATIENT FROM DOCTOR
    # --------------------------------------------------

    @staticmethod
    def remove_patient_from_doctor(
        doctor_id: str,
        patient_id: str
    ):

        response = (
            supabase
            .table("doctor_patients")
            .delete()
            .eq(
                "doctor_id",
                doctor_id
            )
            .eq(
                "patient_id",
                patient_id
            )
            .execute()
        )


        if not response.data:

            raise ValueError(
                "Doctor-patient relationship not found"
            )


        return {
            "message": "Patient removed from doctor",
            "doctor_id": doctor_id,
            "patient_id": patient_id
        }
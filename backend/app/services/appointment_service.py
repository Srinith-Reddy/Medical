from app.db.supabase import supabase


class AppointmentService:

    # --------------------------------------------------
    # CREATE APPOINTMENT
    # --------------------------------------------------

    @staticmethod
    def create_appointment(
        patient_id: str,
        doctor_id: str,
        organization_id: str,
        appointment_date,
        status: str = "SCHEDULED"
    ):

        appointment_data = {
            "patient_id": patient_id,
            "doctor_id": doctor_id,
            "organization_id": organization_id,
            "appointment_date": appointment_date.isoformat(),
            "status": status
        }

        response = (
            supabase
            .table("appointments")
            .insert(appointment_data)
            .execute()
        )

        if not response.data:
            raise ValueError(
                "Failed to create appointment"
            )

        return response.data[0]


    # --------------------------------------------------
    # GET APPOINTMENT BY ID
    # --------------------------------------------------

    @staticmethod
    def get_appointment(appointment_id: str):

        response = (
            supabase
            .table("appointments")
            .select("*")
            .eq("id", appointment_id)
            .single()
            .execute()
        )

        if not response.data:
            raise ValueError(
                "Appointment not found"
            )

        return response.data


    # --------------------------------------------------
    # GET PATIENT APPOINTMENTS
    # --------------------------------------------------

    @staticmethod
    def get_patient_appointments(patient_id: str):

        response = (
            supabase
            .table("appointments")
            .select("*")
            .eq("patient_id", patient_id)
            .order(
                "appointment_date",
                desc=True
            )
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # GET ORGANIZATION APPOINTMENTS
    # --------------------------------------------------

    @staticmethod
    def get_organization_appointments(
        organization_id: str
    ):

        response = (
            supabase
            .table("appointments")
            .select("*")
            .eq(
                "organization_id",
                organization_id
            )
            .order(
                "appointment_date",
                desc=True
            )
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # GET DOCTOR APPOINTMENTS
    # --------------------------------------------------

    @staticmethod
    def get_appointments_by_doctor(
        doctor_id: str
    ):

        response = (
            supabase
            .table("appointments")
            .select("*")
            .eq(
                "doctor_id",
                doctor_id
            )
            .order(
                "appointment_date",
                desc=False
            )
            .execute()
        )

        return response.data


    # --------------------------------------------------
    # UPDATE APPOINTMENT STATUS
    # --------------------------------------------------

    @staticmethod
    def update_appointment_status(
        appointment_id: str,
        status: str
    ):

        response = (
            supabase
            .table("appointments")
            .update({
                "status": status
            })
            .eq(
                "id",
                appointment_id
            )
            .execute()

        )

        if not response.data:
            raise ValueError(
                "Appointment not found"
            )

        return response.data[0]
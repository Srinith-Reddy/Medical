import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

import { getAllOrganizations } from "../../services/organizationService";

import {
    getOrganizationAppointments,
    updateAppointmentStatus
} from "../../services/appointmentService";

import { getDoctors } from "../../services/doctorService";
import { getAllPatients } from "../../services/patientService";


function OrganizationAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [updatingAppointment, setUpdatingAppointment] = useState(null);


    // --------------------------------------------------
    // LOAD APPOINTMENTS
    // --------------------------------------------------

    useEffect(() => {
        loadAppointments();
    }, []);


    const loadAppointments = async () => {

        try {

            setLoading(true);
            setError("");

            // Get organizations
            const organizations =
                await getAllOrganizations();

            // Temporary until authentication is implemented
            const currentOrganization =
                organizations[0];


            if (!currentOrganization?.id) {

                setAppointments([]);
                setDoctors([]);
                setPatients([]);

                return;
            }


            // Load appointments, doctors and patients
            const [
                appointmentsData,
                doctorsData,
                patientsData
            ] = await Promise.all([

                getOrganizationAppointments(
                    currentOrganization.id
                ),

                getDoctors(
                    currentOrganization.id
                ),

                getAllPatients()

            ]);


            setAppointments(
                appointmentsData || []
            );

            setDoctors(
                doctorsData || []
            );

            setPatients(
                patientsData || []
            );


        } catch (error) {

            console.error(
                "Failed to load appointments:",
                error
            );

            setError(
                "Unable to load appointments. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    // --------------------------------------------------
    // GET PATIENT NAME
    // --------------------------------------------------

    const getPatientName = (patientId) => {

        const patient = patients.find(
            (patient) =>
                String(patient.id) === String(patientId)
        );

        return patient?.name || "Patient";

    };


    // --------------------------------------------------
    // GET DOCTOR NAME
    // --------------------------------------------------

    const getDoctorName = (appointment) => {

        // If API already returns doctor object
        if (appointment?.doctor?.name) {
            return appointment.doctor.name;
        }


        // Support different possible API field names
        const doctorId =
            appointment?.doctor_id ||
            appointment?.doctorId ||
            appointment?.doctor?.id;


        if (!doctorId) {
            return "Not assigned";
        }


        const doctor = doctors.find(
            (doctor) =>
                String(doctor.id) === String(doctorId)
        );


        return doctor?.name || "Not assigned";

    };


    // --------------------------------------------------
    // FORMAT DATE
    // --------------------------------------------------

    const formatDate = (date) => {

        if (!date) {
            return "--";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // --------------------------------------------------
    // FORMAT TIME
    // --------------------------------------------------

    const formatTime = (date) => {

        if (!date) {
            return "--";
        }

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    // --------------------------------------------------
    // CHECK IF APPOINTMENT TIME HAS PASSED
    // --------------------------------------------------

    const canMarkVisited = (appointment) => {

        if (!appointment?.appointment_date) {
            return false;
        }

        return (
            new Date() >=
            new Date(appointment.appointment_date)
        );

    };


    // --------------------------------------------------
    // STATUS STYLE
    // --------------------------------------------------

    const getStatusStyle = (status) => {

        switch (status?.toUpperCase()) {

            case "SCHEDULED":
                return "bg-green-50 text-green-700";

            case "VISITED":
                return "bg-blue-50 text-blue-700";

            case "COMPLETED":
                return "bg-purple-50 text-purple-700";

            case "CANCELLED":
                return "bg-red-50 text-red-700";

            default:
                return "bg-slate-100 text-slate-600";

        }

    };


    // --------------------------------------------------
    // MARK AS VISITED
    // --------------------------------------------------

    const handleMarkVisited = async (appointmentId) => {

        try {

            setUpdatingAppointment(
                appointmentId
            );


            const updatedAppointment =
                await updateAppointmentStatus(
                    appointmentId,
                    "VISITED"
                );


            setAppointments(
                (currentAppointments) =>
                    currentAppointments.map(
                        (appointment) =>
                            appointment.id === appointmentId
                                ? updatedAppointment
                                : appointment
                    )
            );


        } catch (error) {

            console.error(
                "Failed to mark appointment as visited:",
                error
            );

            alert(
                "Unable to mark appointment as visited."
            );

        } finally {

            setUpdatingAppointment(null);

        }

    };


    return (

        <DashboardLayout
            sidebar={<OrganizationSidebar />}
        >

            {/* --------------------------------------------------
                HEADER
            -------------------------------------------------- */}

            <div className="mb-8">

                <p className="
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-blue-600
                    font-semibold
                ">
                    ORGANIZATION PORTAL
                </p>

                <h1 className="
                    text-4xl
                    font-bold
                    text-slate-900
                    mt-2
                ">
                    Appointments
                </h1>

                <p className="
                    text-slate-500
                    mt-2
                ">
                    View and manage appointments for your organization.
                </p>

            </div>


            {/* --------------------------------------------------
                LOADING
            -------------------------------------------------- */}

            {loading && (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-8
                    text-center
                ">

                    <p className="text-slate-500">
                        Loading appointments...
                    </p>

                </div>

            )}


            {/* --------------------------------------------------
                ERROR
            -------------------------------------------------- */}

            {!loading && error && (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-red-200
                    p-8
                    text-center
                ">

                    <p className="text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={loadAppointments}
                        className="
                            mt-4
                            px-5
                            py-2.5
                            rounded-xl
                            bg-blue-600
                            text-white
                            text-sm
                            font-medium
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* --------------------------------------------------
                EMPTY STATE
            -------------------------------------------------- */}

            {!loading &&
                !error &&
                appointments.length === 0 && (

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        p-10
                        text-center
                    ">

                        <div className="
                            w-14
                            h-14
                            mx-auto
                            rounded-2xl
                            bg-blue-50
                            flex
                            items-center
                            justify-center
                            text-blue-600
                            text-2xl
                        ">
                            📅
                        </div>

                        <h2 className="
                            text-lg
                            font-semibold
                            text-slate-900
                            mt-5
                        ">
                            No appointments yet
                        </h2>

                        <p className="
                            text-sm
                            text-slate-500
                            mt-2
                        ">
                            There are currently no appointments
                            for this organization.
                        </p>

                    </div>

                )}


            {/* --------------------------------------------------
                APPOINTMENT LIST
            -------------------------------------------------- */}

            {!loading &&
                !error &&
                appointments.length > 0 && (

                    <div className="space-y-3">

                        {appointments.map(
                            (appointment) => (

                                <div
                                    key={appointment.id}
                                    className="
                                        bg-white
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        px-5
                                        py-4
                                        shadow-sm
                                        hover:shadow-md
                                        transition
                                    "
                                >

                                    {/* TOP ROW */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    ">

                                        {/* DATE + TIME */}

                                        <div>

                                            <p className="
                                                text-base
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {formatDate(
                                                    appointment.appointment_date
                                                )}
                                            </p>

                                            <p className="
                                                text-sm
                                                text-slate-500
                                                mt-0.5
                                            ">
                                                {formatTime(
                                                    appointment.appointment_date
                                                )}
                                            </p>

                                        </div>


                                        {/* STATUS */}

                                        <span
                                            className={`
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                ${getStatusStyle(
                                                    appointment.status
                                                )}
                                            `}
                                        >
                                            {appointment.status || "UNKNOWN"}
                                        </span>

                                    </div>


                                    {/* PATIENT + DOCTOR */}

                                    <div className="
                                        grid
                                        grid-cols-1
                                        md:grid-cols-2
                                        gap-3
                                        mt-3
                                    ">

                                        {/* PATIENT */}

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            bg-slate-50
                                            rounded-xl
                                            px-4
                                            py-3
                                        ">

                                            <span className="
                                                text-sm
                                                text-slate-500
                                            ">
                                                Patient
                                            </span>

                                            <span className="
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {getPatientName(
                                                    appointment.patient_id
                                                )}
                                            </span>

                                        </div>


                                        {/* DOCTOR */}

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            bg-slate-50
                                            rounded-xl
                                            px-4
                                            py-3
                                        ">

                                            <span className="
                                                text-sm
                                                text-slate-500
                                            ">
                                                Doctor
                                            </span>

                                            <span className="
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {getDoctorName(
                                                    appointment
                                                )}
                                            </span>

                                        </div>

                                    </div>


                                    {/* MARK AS VISITED */}

                                    {appointment.status?.toUpperCase() ===
                                        "SCHEDULED" &&

                                        canMarkVisited(appointment) && (

                                            <div className="
                                                mt-3
                                                flex
                                                justify-end
                                            ">

                                                <button
                                                    onClick={() =>
                                                        handleMarkVisited(
                                                            appointment.id
                                                        )
                                                    }
                                                    disabled={
                                                        updatingAppointment ===
                                                        appointment.id
                                                    }
                                                    className="
                                                        px-4
                                                        py-2
                                                        rounded-xl
                                                        bg-blue-600
                                                        text-white
                                                        text-sm
                                                        font-medium
                                                        hover:bg-blue-700
                                                        disabled:opacity-50
                                                        disabled:cursor-not-allowed
                                                        transition
                                                    "
                                                >

                                                    {updatingAppointment ===
                                                    appointment.id
                                                        ? "Updating..."
                                                        : "Mark as Visited"}

                                                </button>

                                            </div>

                                        )}


                                    {/* VISITED */}

                                    {appointment.status?.toUpperCase() ===
                                        "VISITED" && (

                                            <div className="
                                                mt-3
                                                flex
                                                justify-end
                                            ">

                                                <span className="
                                                    text-sm
                                                    font-medium
                                                    text-blue-600
                                                ">
                                                    ✓ Patient visited
                                                </span>

                                            </div>

                                        )}

                                </div>

                            )
                        )}

                    </div>

                )}

        </DashboardLayout>

    );

}

export default OrganizationAppointments;
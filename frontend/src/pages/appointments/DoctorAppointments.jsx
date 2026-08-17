import { useEffect, useState } from "react";
import {
    CalendarDays,
    Clock,
    User,
    CheckCircle,
    XCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";

import { getDoctors } from "../../services/doctorService";

import {
    getDoctorAppointments,
    updateAppointmentStatus
} from "../../services/appointmentService";


function DoctorAppointments() {

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [updatingId, setUpdatingId] = useState(null);


    // --------------------------------------------------
    // LOAD APPOINTMENTS
    // --------------------------------------------------

    const loadAppointments = async () => {

        try {

            setLoading(true);
            setError("");


            // --------------------------------------------------
            // GET ORGANIZATION
            // --------------------------------------------------

            const organizationId =
                localStorage.getItem("organizationId");


            if (!organizationId) {

                setError(
                    "Organization information not found."
                );

                return;

            }


            // --------------------------------------------------
            // GET DOCTOR
            // --------------------------------------------------

            const doctorsData =
                await getDoctors(organizationId);


            const currentDoctor =
                doctorsData?.[0];


            if (!currentDoctor) {

                setError(
                    "No doctor found."
                );

                return;

            }


            setDoctor(currentDoctor);


            // --------------------------------------------------
            // GET DOCTOR APPOINTMENTS
            // --------------------------------------------------

            const appointmentsData =
                await getDoctorAppointments(
                    currentDoctor.id
                );


            setAppointments(
                Array.isArray(appointmentsData)
                    ? appointmentsData
                    : []
            );


        } catch (error) {

            console.error(
                "Failed to load doctor appointments:",
                error
            );


            setError(
                error.response?.data?.detail ||
                "Unable to load appointments."
            );


        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadAppointments();

    }, []);


    // --------------------------------------------------
    // FORMAT DATE
    // --------------------------------------------------

    const formatDate = (dateString) => {

        if (!dateString) {
            return "--";
        }


        const date =
            new Date(dateString);


        return date.toLocaleDateString(
            [],
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

    const formatTime = (dateString) => {

        if (!dateString) {
            return "--";
        }


        const date =
            new Date(dateString);


        return date.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    // --------------------------------------------------
    // UPDATE APPOINTMENT STATUS
    // --------------------------------------------------

    const handleStatusUpdate = async (
        appointmentId,
        status
    ) => {

        try {

            setUpdatingId(appointmentId);


            await updateAppointmentStatus(
                appointmentId,
                status
            );


            // Reload latest data from backend
            await loadAppointments();


        } catch (error) {

            console.error(
                "Failed to update appointment:",
                error
            );


            setError(
                error.response?.data?.detail ||
                "Failed to update appointment status."
            );


        } finally {

            setUpdatingId(null);

        }

    };


    // --------------------------------------------------
    // START / VIEW CONSULTATION
    // --------------------------------------------------

    const openConsultation = (appointmentId) => {

        navigate(
            `/doctor/appointments/${appointmentId}`
        );

    };


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (

            <DashboardLayout
                sidebar={<DoctorSidebar />}
            >

                <div className="
                    flex
                    items-center
                    justify-center
                    min-h-[60vh]
                ">

                    <p className="text-slate-500">
                        Loading appointments...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error) {

        return (

            <DashboardLayout
                sidebar={<DoctorSidebar />}
            >

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-red-200
                    p-8
                    text-center
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Something went wrong
                    </h2>


                    <p className="
                        text-red-600
                        mt-2
                    ">
                        {error}
                    </p>


                    <button
                        onClick={loadAppointments}
                        className="
                            mt-5
                            px-5
                            py-2.5
                            rounded-xl
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Try Again
                    </button>

                </div>

            </DashboardLayout>

        );

    }


    // --------------------------------------------------
    // DASHBOARD
    // --------------------------------------------------

    return (

        <DashboardLayout
            sidebar={<DoctorSidebar />}
        >

            {/* -------------------------------------------------- */}
            {/* HEADER */}
            {/* -------------------------------------------------- */}

            <div className="mb-8">

                <p className="
                    text-sm
                    font-medium
                    text-slate-500
                ">
                    Appointments
                </p>


                <h1 className="
                    text-3xl
                    font-semibold
                    text-slate-900
                    mt-1
                ">
                    My Appointments
                </h1>


                <p className="
                    text-slate-500
                    mt-2
                ">
                    View and manage your scheduled appointments.
                </p>

            </div>


            {/* -------------------------------------------------- */}
            {/* DOCTOR INFO */}
            {/* -------------------------------------------------- */}

            {doctor && (

                <div className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-5
                    mb-6
                    flex
                    items-center
                    gap-4
                ">

                    <div className="
                        w-12
                        h-12
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                    ">

                        <User
                            size={22}
                            className="text-blue-600"
                        />

                    </div>


                    <div>

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Doctor
                        </p>


                        <h2 className="
                            font-semibold
                            text-slate-900
                        ">
                            {doctor.name || "Doctor"}
                        </h2>

                    </div>

                </div>

            )}


            {/* -------------------------------------------------- */}
            {/* APPOINTMENT COUNT */}
            {/* -------------------------------------------------- */}

            <div className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-5
                mb-6
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <CalendarDays
                        size={22}
                        className="text-slate-500"
                    />


                    <div>

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Total Appointments
                        </p>


                        <p className="
                            text-2xl
                            font-semibold
                            text-slate-900
                        ">
                            {appointments.length}
                        </p>

                    </div>

                </div>

            </div>


            {/* -------------------------------------------------- */}
            {/* NO APPOINTMENTS */}
            {/* -------------------------------------------------- */}

            {appointments.length === 0 && (

                <div className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-12
                    text-center
                ">

                    <CalendarDays
                        size={40}
                        className="
                            mx-auto
                            text-slate-300
                        "
                    />


                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                        mt-4
                    ">
                        No appointments
                    </h2>


                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        You currently have no scheduled appointments.
                    </p>

                </div>

            )}


            {/* -------------------------------------------------- */}
            {/* APPOINTMENT LIST */}
            {/* -------------------------------------------------- */}

            {appointments.length > 0 && (

                <div className="space-y-4">

                    {appointments.map(
                        (appointment) => {

                            const patient =
                                appointment.patient;


                            const patientName =
                                patient?.name ||
                                appointment.patient_name ||
                                "Patient";


                            const status =
                                appointment.status ||
                                "SCHEDULED";


                            return (

                                <div
                                    key={appointment.id}
                                    className="
                                        bg-white
                                        border
                                        border-slate-200
                                        rounded-2xl
                                        p-6
                                        shadow-sm
                                    "
                                >

                                    {/* -------------------------------------------------- */}
                                    {/* TOP SECTION */}
                                    {/* -------------------------------------------------- */}

                                    <div className="
                                        flex
                                        flex-col
                                        md:flex-row
                                        md:items-center
                                        md:justify-between
                                        gap-4
                                    ">


                                        {/* PATIENT */}

                                        <div className="
                                            flex
                                            items-center
                                            gap-4
                                        ">

                                            <div className="
                                                w-12
                                                h-12
                                                rounded-full
                                                bg-slate-100
                                                flex
                                                items-center
                                                justify-center
                                            ">

                                                <User
                                                    size={21}
                                                    className="text-slate-500"
                                                />

                                            </div>


                                            <div>

                                                <h3 className="
                                                    text-base
                                                    font-semibold
                                                    text-slate-900
                                                ">
                                                    {patientName}
                                                </h3>


                                                <p className="
                                                    text-sm
                                                    text-slate-500
                                                    mt-1
                                                ">
                                                    Patient
                                                </p>

                                            </div>

                                        </div>


                                        {/* STATUS */}

                                        <span className="
                                            w-fit
                                            text-xs
                                            font-medium
                                            px-3
                                            py-1.5
                                            rounded-lg
                                            bg-slate-100
                                            text-slate-700
                                        ">
                                            {status}
                                        </span>

                                    </div>


                                    {/* -------------------------------------------------- */}
                                    {/* DATE / TIME */}
                                    {/* -------------------------------------------------- */}

                                    <div className="
                                        flex
                                        flex-wrap
                                        gap-6
                                        mt-6
                                        pt-5
                                        border-t
                                        border-slate-100
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-600
                                        ">

                                            <CalendarDays
                                                size={17}
                                                className="text-slate-400"
                                            />

                                            {formatDate(
                                                appointment.appointment_date
                                            )}

                                        </div>


                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-600
                                        ">

                                            <Clock
                                                size={17}
                                                className="text-slate-400"
                                            />

                                            {formatTime(
                                                appointment.appointment_date
                                            )}

                                        </div>

                                    </div>


                                    {/* -------------------------------------------------- */}
                                    {/* ACTIONS */}
                                    {/* -------------------------------------------------- */}

                                    <div className="
                                        flex
                                        flex-wrap
                                        gap-3
                                        mt-5
                                    ">


                                        {/* ------------------------------------------ */}
                                        {/* SCHEDULED */}
                                        {/* ------------------------------------------ */}

                                        {status === "SCHEDULED" && (

                                            <>

                                                {/* Start Consultation */}

                                                <button
                                                    onClick={() =>
                                                        openConsultation(
                                                            appointment.id
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        px-4
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

                                                    <CalendarDays
                                                        size={16}
                                                    />

                                                    Start Consultation

                                                </button>


                                                {/* Cancel */}

                                                <button
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            appointment.id,
                                                            "CANCELLED"
                                                        )
                                                    }
                                                    disabled={
                                                        updatingId ===
                                                        appointment.id
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        px-4
                                                        py-2.5
                                                        rounded-xl
                                                        bg-red-50
                                                        text-red-700
                                                        text-sm
                                                        font-medium
                                                        hover:bg-red-100
                                                        transition
                                                        disabled:opacity-50
                                                    "
                                                >

                                                    <XCircle
                                                        size={16}
                                                    />

                                                    Cancel

                                                </button>

                                            </>

                                        )}


                                        {/* ------------------------------------------ */}
                                        {/* COMPLETED */}
                                        {/* ------------------------------------------ */}

                                        {status === "COMPLETED" && (

                                            <button
                                                onClick={() =>
                                                    openConsultation(
                                                        appointment.id
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    px-4
                                                    py-2.5
                                                    rounded-xl
                                                    bg-green-50
                                                    text-green-700
                                                    text-sm
                                                    font-medium
                                                    hover:bg-green-100
                                                    transition
                                                "
                                            >

                                                <CheckCircle
                                                    size={16}
                                                />

                                                View Consultation

                                            </button>

                                        )}


                                        {/* ------------------------------------------ */}
                                        {/* CANCELLED */}
                                        {/* ------------------------------------------ */}

                                        {status === "CANCELLED" && (

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                px-4
                                                py-2.5
                                                rounded-xl
                                                bg-slate-50
                                                text-slate-500
                                                text-sm
                                            ">

                                                <XCircle
                                                    size={16}
                                                />

                                                Appointment Cancelled

                                            </div>

                                        )}

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </DashboardLayout>

    );

}


export default DoctorAppointments;
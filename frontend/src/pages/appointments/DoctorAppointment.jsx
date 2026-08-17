import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    User,
    Phone,
    FileText,
    Pill
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";

import { getAppointmentById } from "../../services/appointmentService";


function DoctorAppointment() {

    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // --------------------------------------------------
    // LOAD APPOINTMENT
    // --------------------------------------------------

    const loadAppointment = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAppointmentById(
                    appointmentId
                );

            setAppointment(data);

        } catch (error) {

            console.error(
                "Failed to load appointment:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to load appointment."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadAppointment();

    }, [appointmentId]);


    // --------------------------------------------------
    // FORMAT DATE
    // --------------------------------------------------

    const formatDate = (dateString) => {

        if (!dateString) {
            return "--";
        }

        return new Date(
            dateString
        ).toLocaleDateString(
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

        return new Date(
            dateString
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
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
                        Loading consultation...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error || !appointment) {

        return (

            <DashboardLayout
                sidebar={<DoctorSidebar />}
            >

                <div className="
                    bg-white
                    border
                    border-red-200
                    rounded-2xl
                    p-8
                    text-center
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Unable to load consultation
                    </h2>

                    <p className="
                        text-red-600
                        mt-2
                    ">
                        {error || "Appointment not found."}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/appointments")
                        }
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
                        Back to Appointments
                    </button>

                </div>

            </DashboardLayout>

        );

    }


    const patient =
        appointment.patient;


    return (

        <DashboardLayout
            sidebar={<DoctorSidebar />}
        >

            {/* -------------------------------------------------- */}
            {/* HEADER */}
            {/* -------------------------------------------------- */}

            <div className="mb-8">

                <button
                    onClick={() =>
                        navigate("/appointments")
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-500
                        hover:text-slate-900
                        transition
                        mb-5
                    "
                >

                    <ArrowLeft size={17} />

                    Back to Appointments

                </button>


                <p className="
                    text-sm
                    font-medium
                    text-slate-500
                ">
                    Consultation
                </p>


                <h1 className="
                    text-3xl
                    font-semibold
                    text-slate-900
                    mt-1
                ">
                    Patient Consultation
                </h1>


                <p className="
                    text-slate-500
                    mt-2
                ">
                    Review patient information and continue the consultation.
                </p>

            </div>


            {/* -------------------------------------------------- */}
            {/* PATIENT INFORMATION */}
            {/* -------------------------------------------------- */}

            <div className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-6
                shadow-sm
                mb-6
            ">

                <div className="
                    flex
                    items-center
                    gap-4
                    mb-6
                ">

                    <div className="
                        w-14
                        h-14
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                    ">

                        <User
                            size={25}
                            className="text-blue-600"
                        />

                    </div>


                    <div>

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Patient
                        </p>


                        <h2 className="
                            text-xl
                            font-semibold
                            text-slate-900
                        ">
                            {patient?.name || "Patient"}
                        </h2>

                    </div>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                ">

                    {/* Phone */}

                    <div className="
                        bg-slate-50
                        rounded-xl
                        p-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            text-sm
                        ">

                            <Phone size={16} />

                            Phone

                        </div>


                        <p className="
                            mt-2
                            font-medium
                            text-slate-900
                        ">
                            {patient?.phone || "--"}
                        </p>

                    </div>


                    {/* Gender */}

                    <div className="
                        bg-slate-50
                        rounded-xl
                        p-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            text-sm
                        ">

                            <User size={16} />

                            Gender

                        </div>


                        <p className="
                            mt-2
                            font-medium
                            text-slate-900
                        ">
                            {patient?.gender || "--"}
                        </p>

                    </div>


                    {/* DOB */}

                    <div className="
                        bg-slate-50
                        rounded-xl
                        p-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            text-sm
                        ">

                            <CalendarDays size={16} />

                            Date of Birth

                        </div>


                        <p className="
                            mt-2
                            font-medium
                            text-slate-900
                        ">
                            {patient?.dob || "--"}
                        </p>

                    </div>

                </div>

            </div>


            {/* -------------------------------------------------- */}
            {/* APPOINTMENT DETAILS */}
            {/* -------------------------------------------------- */}

            <div className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-6
                shadow-sm
                mb-6
            ">

                <h2 className="
                    text-lg
                    font-semibold
                    text-slate-900
                    mb-5
                ">
                    Appointment Details
                </h2>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <CalendarDays
                            size={19}
                            className="text-slate-400"
                        />

                        <div>

                            <p className="
                                text-xs
                                text-slate-500
                            ">
                                Date
                            </p>

                            <p className="
                                text-sm
                                font-medium
                                text-slate-900
                            ">
                                {formatDate(
                                    appointment.appointment_date
                                )}
                            </p>

                        </div>

                    </div>


                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <Clock
                            size={19}
                            className="text-slate-400"
                        />

                        <div>

                            <p className="
                                text-xs
                                text-slate-500
                            ">
                                Time
                            </p>

                            <p className="
                                text-sm
                                font-medium
                                text-slate-900
                            ">
                                {formatTime(
                                    appointment.appointment_date
                                )}
                            </p>

                        </div>

                    </div>


                    <div>

                        <p className="
                            text-xs
                            text-slate-500
                        ">
                            Status
                        </p>

                        <span className="
                            inline-block
                            mt-1
                            text-xs
                            font-medium
                            px-3
                            py-1.5
                            rounded-lg
                            bg-slate-100
                            text-slate-700
                        ">
                            {appointment.status}
                        </span>

                    </div>

                </div>

            </div>


            {/* -------------------------------------------------- */}
            {/* CONSULTATION ACTIONS */}
            {/* -------------------------------------------------- */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
            ">

                {/* Medical Records */}

                <div className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-6
                    shadow-sm
                ">

                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                        mb-4
                    ">

                        <FileText
                            size={21}
                            className="text-blue-600"
                        />

                    </div>


                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Medical Records
                    </h2>


                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        View the patient's previous medical records.
                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                `/patients/${patient?.id}`
                            )
                        }
                        disabled={!patient?.id}
                        className="
                            mt-5
                            px-4
                            py-2.5
                            rounded-xl
                            bg-slate-900
                            text-white
                            text-sm
                            font-medium
                            hover:bg-slate-800
                            transition
                            disabled:opacity-50
                        "
                    >
                        View Patient Records
                    </button>

                </div>


                {/* Prescription */}

                <div className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-6
                    shadow-sm
                ">

                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-green-50
                        flex
                        items-center
                        justify-center
                        mb-4
                    ">

                        <Pill
                            size={21}
                            className="text-green-600"
                        />

                    </div>


                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Prescription
                    </h2>


                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        Create a prescription for this patient after consultation.
                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                `/add-prescription?patientId=${patient?.id}&appointmentId=${appointment.id}&organizationId=${appointment.organization_id}&doctorId=${appointment.doctor_id}`
                            )
                        }
                        disabled={!patient?.id || !appointment?.id}
                        className="
                            mt-5
                            px-4
                            py-2.5
                            rounded-xl
                            bg-green-600
                            text-white
                            text-sm
                            font-medium
                            hover:bg-green-700
                            transition
                            disabled:opacity-50
                        "
                    >
                        Create Prescription
                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}


export default DoctorAppointment;
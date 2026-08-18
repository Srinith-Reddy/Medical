import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    User,
    Phone,
    FileText,
    Pill,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";

import { getAppointmentById } from "../../services/appointmentService";
import {
    createConsultation,
    getConsultationsByPatient,
} from "../../services/consultationService";


function DoctorAppointment() {

    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [consultation, setConsultation] = useState(null);
    const [diagnosis, setDiagnosis] = useState("");
    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(true);
    const [consultationLoading, setConsultationLoading] = useState(false);

    const [error, setError] = useState("");
    const [consultationError, setConsultationError] = useState("");
    const [success, setSuccess] = useState("");


    const loadAppointment = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAppointmentById(appointmentId);

            setAppointment(data);

            if (data?.doctor_id) {
                localStorage.setItem("doctorId", data.doctor_id);
            }

            const patientId = data?.patient?.id || data?.patient_id;
            if (patientId) {
                try {
                    const consultations =
                        await getConsultationsByPatient(patientId);

                    const existingConsultation =
                        consultations.find(
                            (item) =>
                                item.appointment_id === appointmentId
                        );

                    if (existingConsultation) {
                        setConsultation(existingConsultation);
                        setDiagnosis(
                            existingConsultation.diagnosis || ""
                        );
                        setNotes(
                            existingConsultation.notes || ""
                        );
                    } else {
                        setConsultation(null);
                        setDiagnosis("");
                        setNotes("");
                    }

                } catch (consultationError) {
                    console.error(
                        "Failed to load consultation:",
                        consultationError
                    );

                    setConsultation(null);
                }
            }


        } catch (error) {

            console.error(
                "Failed to load appointment:",
                error
            );

            const detail = error.response?.data?.detail;

            setError(
                typeof detail === "string"
                    ? detail
                    : "Unable to load appointment."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {
        loadAppointment();
    }, [appointmentId]);


    const formatDate = (dateString) => {

        if (!dateString) return "--";

        return new Date(dateString).toLocaleDateString(
            [],
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const formatTime = (dateString) => {

        if (!dateString) return "--";

        return new Date(dateString).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    const handleCreateConsultation = async () => {

        const patientId =
            appointment?.patient?.id ||
            appointment?.patient_id;

        const doctorId =
            appointment?.doctor_id;

        const organizationId =
            appointment?.organization_id;

        setConsultationError("");
        setSuccess("");

        if (!patientId || !doctorId || !organizationId) {

            setConsultationError(
                "Patient, doctor, or organization information is missing."
            );

            return;
        }

        if (!diagnosis.trim()) {

            setConsultationError(
                "Please enter the diagnosis before completing the consultation."
            );

            return;
        }

        if (!notes.trim()) {

            setConsultationError(
                "Please enter the consultation notes."
            );

            return;
        }

        try {

            setConsultationLoading(true);

            const payload = {
                appointment_id: appointmentId,
                patient_id: patientId,
                staff_id: doctorId,
                organization_id: organizationId,
                diagnosis: diagnosis.trim(),
                notes: notes.trim()
            };

            console.log(
                "CONSULTATION PAYLOAD:",
                payload
            );

            const created =
                await createConsultation(payload);

            setConsultation(created);

            setSuccess(
                "Consultation completed successfully."
            );

        } catch (error) {

            console.error(
                "Failed to create consultation:",
                error
            );

            const detail =
                error.response?.data?.detail;

            if (Array.isArray(detail)) {

                setConsultationError(
                    detail
                        .map((item) => item.msg)
                        .join(", ")
                );

            } else if (
                typeof detail === "string"
            ) {

                setConsultationError(detail);

            } else {

                setConsultationError(
                    "Failed to create consultation."
                );

            }

        } finally {

            setConsultationLoading(false);

        }

    };


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


    const patient = appointment.patient;

    const patientId =
        patient?.id ||
        appointment.patient_id;

    const consultationReady =
        Boolean(consultation?.id);


    return (
        <DashboardLayout
            sidebar={<DoctorSidebar />}
        >

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
                    Review the patient, complete the consultation,
                    and then create the prescription.
                </p>

            </div>


            {/* PATIENT */}

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


            {/* APPOINTMENT */}

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


            {/* CONSULTATION FORM */}

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
                    items-start
                    justify-between
                    gap-4
                    mb-6
                ">

                    <div>

                        <h2 className="
                            text-lg
                            font-semibold
                            text-slate-900
                        ">
                            Consultation
                        </h2>

                        <p className="
                            text-sm
                            text-slate-500
                            mt-1
                        ">
                            Enter the diagnosis and notes before
                            creating the prescription.
                        </p>

                    </div>


                    {consultationReady && (
                        <div className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-green-700
                            bg-green-50
                            px-3
                            py-2
                            rounded-xl
                        ">
                            <CheckCircle2 size={17} />
                            Completed
                        </div>
                    )}

                </div>


                {consultationError && (
                    <div className="
                        flex
                        items-start
                        gap-2
                        bg-red-50
                        border
                        border-red-200
                        text-red-700
                        rounded-xl
                        p-4
                        mb-5
                        text-sm
                    ">
                        <AlertCircle
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <span>
                            {consultationError}
                        </span>
                    </div>
                )}


                {success && (
                    <div className="
                        flex
                        items-center
                        gap-2
                        bg-green-50
                        border
                        border-green-200
                        text-green-700
                        rounded-xl
                        p-4
                        mb-5
                        text-sm
                    ">
                        <CheckCircle2 size={18} />
                        {success}
                    </div>
                )}


                <div className="mb-5">

                    <label className="
                        block
                        text-sm
                        font-medium
                        text-slate-700
                        mb-2
                    ">
                        Diagnosis
                    </label>

                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) =>
                            setDiagnosis(e.target.value)
                        }
                        disabled={consultationReady}
                        placeholder="e.g. Viral fever"
                        className="
                            w-full
                            border
                            border-slate-200
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                            focus:ring-2
                            focus:ring-blue-100
                            disabled:bg-slate-50
                            disabled:text-slate-500
                        "
                    />

                </div>


                <div className="mb-5">

                    <label className="
                        block
                        text-sm
                        font-medium
                        text-slate-700
                        mb-2
                    ">
                        Consultation Notes
                    </label>

                    <textarea
                        value={notes}
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                        disabled={consultationReady}
                        rows={5}
                        placeholder="Enter consultation notes..."
                        className="
                            w-full
                            border
                            border-slate-200
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                            resize-none
                            focus:ring-2
                            focus:ring-blue-100
                            disabled:bg-slate-50
                            disabled:text-slate-500
                        "
                    />

                </div>


                {!consultationReady && (
                    <button
                        onClick={handleCreateConsultation}
                        disabled={consultationLoading}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            bg-blue-600
                            text-white
                            text-sm
                            font-medium
                            hover:bg-blue-700
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        <CheckCircle2 size={18} />

                        {consultationLoading
                            ? "Completing..."
                            : "Complete Consultation"
                        }
                    </button>
                )}

            </div>


            {/* ACTIONS */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
            ">

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
                                `/patients/${patientId}`
                            )
                        }
                        disabled={!patientId}
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
                        Create a prescription after completing
                        this consultation.
                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                `/add-prescription?patientId=${patientId}&appointmentId=${appointment.id}&organizationId=${appointment.organization_id}&doctorId=${appointment.doctor_id}&consultationId=${consultation?.id}`
                            )
                        }
                        disabled={
                            !patientId ||
                            !appointment?.id ||
                            !consultation?.id
                        }
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
                            disabled:cursor-not-allowed
                        "
                    >
                        {consultationReady
                            ? "Create Prescription"
                            : "Complete Consultation First"
                        }
                    </button>

                </div>

            </div>

        </DashboardLayout>
    );

}


export default DoctorAppointment;
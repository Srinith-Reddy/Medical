import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

import { getAllOrganizations } from "../../services/organizationService";
import { getOrganizationAppointments } from "../../services/appointmentService";

function OrganizationAppointments() {

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --------------------------------------------------
    // LOAD ORGANIZATION APPOINTMENTS
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

                return;
            }


            // Get appointments belonging to this organization
            const data =
                await getOrganizationAppointments(
                    currentOrganization.id
                );


            setAppointments(data || []);

        } catch (error) {

            console.error(
                "Failed to load organization appointments:",
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
    // FORMAT DATE
    // --------------------------------------------------

    const formatDate = (date) => {

        if (!date) {
            return "--";
        }

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    };


    // --------------------------------------------------
    // STATUS STYLE
    // --------------------------------------------------

    const getStatusStyle = (status) => {

        switch (status?.toUpperCase()) {

            case "SCHEDULED":
                return "bg-green-50 text-green-700";

            case "COMPLETED":
                return "bg-blue-50 text-blue-700";

            case "CANCELLED":
                return "bg-red-50 text-red-700";

            default:
                return "bg-slate-100 text-slate-600";

        }

    };


    return (

        <DashboardLayout
            sidebar={<OrganizationSidebar />}
        >

            {/* --------------------------------------------------
                PAGE HEADER
            -------------------------------------------------- */}

            <div className="mb-8">

                <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium">
                    ORGANIZATION PORTAL
                </p>

                <h1 className="text-4xl font-bold text-slate-900 mt-2">
                    Appointments
                </h1>

                <p className="text-slate-500 mt-2">
                    View and manage appointments for your organization.
                </p>

            </div>


            {/* --------------------------------------------------
                LOADING
            -------------------------------------------------- */}

            {loading && (

                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">

                    <p className="text-slate-500">
                        Loading appointments...
                    </p>

                </div>

            )}


            {/* --------------------------------------------------
                ERROR
            -------------------------------------------------- */}

            {!loading && error && (

                <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">

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
                NO APPOINTMENTS
            -------------------------------------------------- */}

            {!loading &&
                !error &&
                appointments.length === 0 && (

                    <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">

                        <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
                            📅
                        </div>

                        <h2 className="text-lg font-semibold text-slate-900 mt-5">
                            No appointments yet
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
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

                    <div className="space-y-4">

                        {appointments.map((appointment) => (

                            <div
                                key={appointment.id}
                                className="
                                    bg-white
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    p-6
                                    shadow-sm
                                    hover:shadow-md
                                    transition
                                "
                            >

                                <div className="flex items-center justify-between">

                                    {/* Appointment information */}

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Appointment
                                        </p>

                                        <h2 className="text-lg font-semibold text-slate-900 mt-1">
                                            {formatDate(
                                                appointment.appointment_date
                                            )}
                                        </h2>

                                    </div>


                                    {/* Status */}

                                    <span
                                        className={`
                                            px-3
                                            py-1.5
                                            rounded-full
                                            text-xs
                                            font-medium
                                            ${getStatusStyle(
                                                appointment.status
                                            )}
                                        `}
                                    >
                                        {appointment.status || "UNKNOWN"}
                                    </span>

                                </div>


                                {/* Additional information */}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                                    <div className="bg-slate-50 rounded-xl p-4">

                                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                                            Appointment ID
                                        </p>

                                        <p className="text-sm font-medium text-slate-900 mt-1 break-all">
                                            {appointment.id || "--"}
                                        </p>

                                    </div>


                                    <div className="bg-slate-50 rounded-xl p-4">

                                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                                            Patient
                                        </p>

                                        <p className="text-sm font-medium text-slate-900 mt-1">
                                            {appointment.patient_id || "--"}
                                        </p>

                                    </div>


                                    <div className="bg-slate-50 rounded-xl p-4">

                                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                                            Doctor
                                        </p>

                                        <p className="text-sm font-medium text-slate-900 mt-1">
                                            {appointment.doctor_id || "--"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

        </DashboardLayout>

    );

}

export default OrganizationAppointments;
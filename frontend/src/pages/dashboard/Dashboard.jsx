import PatientSidebar from "../../components/sidebar/PatientSidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CalendarDays, Clock, MapPin } from "lucide-react";

import { getAllPatients } from "../../services/patientService";
import { getPatientAppointments } from "../../services/appointmentService";
import { getAllOrganizations } from "../../services/organizationService";

import HeroCard from "../../components/cards/HeroCard";
import HealthSummary from "../../components/cards/HealthSummary";
import RecentActivity from "../../components/cards/RecentActivity";


function Dashboard() {

    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [organizations, setOrganizations] = useState([]);

    const [appointmentsLoading, setAppointmentsLoading] = useState(false);


    // --------------------------------------------------
    // LOAD PATIENT
    // --------------------------------------------------

    useEffect(() => {
        loadPatient();
    }, []);


    const loadPatient = async () => {

        try {

            const data = await getAllPatients();

            // Temporary until authentication is implemented
            const currentPatient = data[0];

            setPatient(currentPatient);

            if (currentPatient?.id) {
                loadAppointments(currentPatient.id);
            }

        } catch (error) {

            console.error("Error loading patient:", error);

        }

    };


    // --------------------------------------------------
    // LOAD ORGANIZATIONS
    // --------------------------------------------------

    useEffect(() => {
        loadOrganizations();
    }, []);


    const loadOrganizations = async () => {

        try {

            const data = await getAllOrganizations();

            setOrganizations(data);

        } catch (error) {

            console.error("Error loading organizations:", error);

        }

    };


    // --------------------------------------------------
    // LOAD PATIENT APPOINTMENTS
    // --------------------------------------------------

    const loadAppointments = async (patientId) => {

        try {

            setAppointmentsLoading(true);

            const data = await getPatientAppointments(patientId);

            setAppointments(data);

        } catch (error) {

            console.error("Error loading appointments:", error);

        } finally {

            setAppointmentsLoading(false);

        }

    };


    // --------------------------------------------------
    // FORMAT DATE
    // --------------------------------------------------

    const formatAppointmentDate = (date) => {

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    };


    // --------------------------------------------------
    // FORMAT TIME
    // --------------------------------------------------

    const formatAppointmentTime = (date) => {

        return new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

    };


    // --------------------------------------------------
    // GET ORGANIZATION NAME
    // --------------------------------------------------

    const getOrganizationName = (organizationId) => {

        const organization = organizations.find(
            (org) => org.id === organizationId
        );

        return organization?.name || "Hospital";

    };


    // --------------------------------------------------
    // STATUS STYLING
    // --------------------------------------------------

    const getStatusStyle = (status) => {

        switch (status) {

            case "SCHEDULED":
                return "bg-green-50 text-green-700 border border-green-100";

            case "COMPLETED":
                return "bg-blue-50 text-blue-700 border border-blue-100";

            case "CANCELLED":
                return "bg-red-50 text-red-700 border border-red-100";

            default:
                return "bg-slate-50 text-slate-600 border border-slate-200";

        }

    };


    return (

        <div className="flex h-screen bg-slate-100">

            {/* Sidebar */}

            <PatientSidebar />


            <div className="flex-1 flex flex-col">

                {/* Navbar */}

                <Navbar patient={patient} />


                <main className="flex-1 bg-slate-100 px-8 pt-4 pb-8 overflow-y-auto">

                    {/* Hero */}

                    <HeroCard patient={patient} />


                    {/* Health Summary */}

                    <HealthSummary patient={patient} />


                    {/* -------------------------------------------------- */}
                    {/* APPOINTMENTS */}
                    {/* -------------------------------------------------- */}

                    <section className="mt-8">

                        {/* Section Header */}

                        <div className="flex items-center justify-between mb-5">

                            <div>

                                <h2 className="text-xl font-semibold text-slate-900">
                                    My Appointments
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Your upcoming and past appointments
                                </p>

                            </div>


                            {/* Book Appointment */}

                            <button
                                onClick={() =>
                                    navigate("/appointments/book")
                                }
                                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all duration-200"
                            >
                                Book Appointment
                            </button>

                        </div>


                        {/* Loading */}

                        {appointmentsLoading ? (

                            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">

                                <p className="text-sm text-slate-500">
                                    Loading your appointments...
                                </p>

                            </div>

                        ) : appointments.length === 0 ? (

                            /* -------------------------------------------------- */
                            /* EMPTY STATE */
                            /* -------------------------------------------------- */

                            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">

                                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center">

                                    <CalendarDays
                                        size={22}
                                        className="text-slate-500"
                                    />

                                </div>

                                <h3 className="mt-4 text-base font-semibold text-slate-900">
                                    No appointments yet
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    You don't have any appointments scheduled.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/appointments/book")
                                    }
                                    className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Book your first appointment →
                                </button>

                            </div>

                        ) : (

                            /* -------------------------------------------------- */
                            /* APPOINTMENT LIST */
                            /* -------------------------------------------------- */

                            <div className="space-y-4">

                                {appointments.map((appointment) => (

                                    <div
                                        key={appointment.id}
                                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
                                    >

                                        <div className="flex items-center justify-between gap-6">


                                            {/* LEFT SIDE */}

                                            <div className="flex items-start gap-4">

                                                {/* Calendar Icon */}

                                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">

                                                    <CalendarDays
                                                        size={22}
                                                        className="text-slate-700"
                                                    />

                                                </div>


                                                {/* Appointment Details */}

                                                <div>

                                                    {/* Hospital */}

                                                    <div className="flex items-center gap-2">

                                                        <MapPin
                                                            size={15}
                                                            className="text-slate-400"
                                                        />

                                                        <p className="text-base font-semibold text-slate-900">
                                                            {getOrganizationName(
                                                                appointment.organization_id
                                                            )}
                                                        </p>

                                                    </div>


                                                    {/* Date */}

                                                    <div className="flex items-center gap-2 mt-2">

                                                        <CalendarDays
                                                            size={15}
                                                            className="text-slate-400"
                                                        />

                                                        <p className="text-sm text-slate-600">
                                                            {formatAppointmentDate(
                                                                appointment.appointment_date
                                                            )}
                                                        </p>

                                                    </div>


                                                    {/* Time */}

                                                    <div className="flex items-center gap-2 mt-1">

                                                        <Clock
                                                            size={15}
                                                            className="text-slate-400"
                                                        />

                                                        <p className="text-sm text-slate-600">
                                                            {formatAppointmentTime(
                                                                appointment.appointment_date
                                                            )}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* STATUS */}

                                            <span
                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                                                    appointment.status
                                                )}`}
                                            >
                                                {appointment.status}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* Recent Activity */}

                    <RecentActivity patient={patient} />

                </main>

            </div>

        </div>

    );

}

export default Dashboard;
import { useEffect, useState } from "react";

import { getAllOrganizations } from "../../services/organizationService";
import { getAllPatients } from "../../services/patientService";
import { createAppointment } from "../../services/appointmentService";

function BookAppointment() {

    const [organizations, setOrganizations] = useState([]);
    const [patient, setPatient] = useState(null);

    const [organizationId, setOrganizationId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [organizationsData, patientsData] =
                await Promise.all([
                    getAllOrganizations(),
                    getAllPatients()
                ]);

            setOrganizations(organizationsData);

            // Temporary until authentication is implemented
            setPatient(patientsData[0]);

        } catch (error) {

            console.error("Failed to load appointment data:", error);
            setError("Unable to load appointment details.");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!patient) {
            setError("Patient information could not be loaded.");
            return;
        }

        if (!organizationId || !appointmentDate) {
            setError("Please select a hospital and appointment date.");
            return;
        }

        try {

            setLoading(true);

            const appointmentData = {
                patient_id: patient.id,
                organization_id: organizationId,
                appointment_date:
                    new Date(appointmentDate).toISOString(),
                status: "SCHEDULED",
            };

            console.log("Creating appointment:", appointmentData);

            await createAppointment(appointmentData);

            setMessage("Appointment booked successfully.");

            setOrganizationId("");
            setAppointmentDate("");

        } catch (error) {

            console.error("Failed to book appointment:", error);

            setError(
                error.response?.data?.detail ||
                "Failed to book appointment. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-50 px-6 py-10">

            <div className="max-w-2xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <p className="text-sm font-medium text-slate-500 mb-2">
                        Appointments
                    </p>

                    <h1 className="text-3xl font-semibold text-slate-900">
                        Book an Appointment
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Choose a hospital and a convenient time for your visit.
                    </p>

                </div>


                {/* Appointment Card */}

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">

                    {/* Patient */}

                    <div className="mb-7">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Patient
                        </label>

                        <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">

                            {patient ? (

                                <div>

                                    <p className="font-medium text-slate-900">
                                        {patient.name}
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Patient ID: {patient.id}
                                    </p>

                                </div>

                            ) : (

                                <p className="text-slate-400">
                                    Loading patient...
                                </p>

                            )}

                        </div>

                    </div>


                    {/* Hospital */}

                    <div className="mb-7">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Hospital / Organization
                        </label>

                        <select
                            value={organizationId}
                            onChange={(e) =>
                                setOrganizationId(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >

                            <option value="">
                                Select hospital
                            </option>

                            {organizations.map((organization) => (

                                <option
                                    key={organization.id}
                                    value={organization.id}
                                >
                                    {organization.name}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Date & Time */}

                    <div className="mb-7">

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Appointment Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={(e) =>
                                setAppointmentDate(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">

                            <p className="text-sm text-red-700">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* Success */}

                    {message && (

                        <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3">

                            <p className="text-sm text-green-700">
                                {message}
                            </p>

                        </div>

                    )}


                    {/* Submit */}

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || !patient}
                        className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                        {loading
                            ? "Booking Appointment..."
                            : "Confirm Appointment"}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default BookAppointment;
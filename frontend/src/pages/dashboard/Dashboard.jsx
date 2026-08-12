import PatientSidebar from "../../components/sidebar/PatientSidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllPatients } from "../../services/patientService";

import HeroCard from "../../components/cards/HeroCard";
import HealthSummary from "../../components/cards/HealthSummary";
import RecentActivity from "../../components/cards/RecentActivity";

function Dashboard() {

    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        loadPatient();
    }, []);

    const loadPatient = async () => {

        try {

            const data = await getAllPatients();

            // Temporary:
            // Using the first patient until login/authentication is implemented.
            setPatient(data[0]);

        } catch (error) {

            console.error("Error loading patient:", error);

        }

    };

    return (

        <div className="flex h-screen bg-slate-100">

            <PatientSidebar />

            <div className="flex-1 flex flex-col">

                <Navbar patient={patient} />

                <main className="flex-1 bg-slate-100 p-8 overflow-y-auto">

                    {/* Hero Section */}
                    <HeroCard patient={patient} />

                    {/* Health Summary */}
                    <HealthSummary patient={patient} />

                    {/* Book Appointment */}
                    <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Need to see a doctor?
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Book an appointment with a hospital at a convenient time.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/appointments/book")}
                            className="bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
                        >
                            Book Appointment
                        </button>

                    </div>

                    {/* Recent Activity */}
                    <RecentActivity patient={patient} />

                </main>

            </div>

        </div>

    );

}

export default Dashboard;
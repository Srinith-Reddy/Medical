import PatientSidebar from "../../components/sidebar/PatientSidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { getAllPatients } from "../../services/patientService";

import HeroCard from "../../components/cards/HeroCard";
import HealthSummary from "../../components/cards/HealthSummary";
import RecentActivity from "../../components/cards/RecentActivity";

function Dashboard() {

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

                {/* ✅ Pass patient to Navbar */}
                <Navbar patient={patient} />

                <main className="flex-1 bg-slate-100 p-8 overflow-y-auto">

                    {/* Hero Section */}
                    <HeroCard patient={patient} />

                    {/* Health Summary */}
                    <HealthSummary patient={patient} />

                    {/* Recent Activity */}
                    <RecentActivity patient={patient} />

                </main>

            </div>

        </div>

    );

}

export default Dashboard;
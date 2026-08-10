import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { getAllPatients } from "../../services/patientService";
import HealthSummary from "../../components/cards/HealthSummary";
import HeroCard from "../../components/cards/HeroCard";
import RecentActivity from "../../components/cards/RecentActivity";

function Dashboard() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        try {
            const data = await getAllPatients();
            // TODO: Replace getAllPatients() with getPatient(patientId)
            // after authentication is implemented.
            setPatients(data);
        } catch (error) {
            console.error("Error loading patients:", error);
        }
    };

    const loadOrganizations = async () => {
        try {
            console.log("Loading organizations...");

            const data = await getAllOrganizations();

            console.log("Received data:", data);

            setOrganizations(data);

        } catch (error) {
        console.error("API Error:", error);
        }
    };

    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="flex-1 bg-slate-100 p-8 overflow-y-auto">

                    <HeroCard patient={patients[0]} />


                    <HealthSummary patient={patients[0]} />
                    <RecentActivity />

                </main>
            </div>
        </div>
    );
}

export default Dashboard;
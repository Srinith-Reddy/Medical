import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrescriptionHeader from "../../components/prescriptions/PrescriptionHeader";
import PrescriptionSearch from "../../components/prescriptions/PrescriptionSearch";
import PrescriptionTable from "../../components/prescriptions/PrescriptionTable";

function Prescriptions() {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    return (

        <DashboardLayout>

            <PrescriptionHeader />

            <div className="flex justify-end mb-6">

                <button

                    onClick={() => navigate("/add-prescription")}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"

                >

                    + Add Prescription

                </button>

            </div>

            <PrescriptionSearch

                searchTerm={searchTerm}

                setSearchTerm={setSearchTerm}

            />

            <PrescriptionTable

                searchTerm={searchTerm}

            />

        </DashboardLayout>

    );

}

export default Prescriptions;
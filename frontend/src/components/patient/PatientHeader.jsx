import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PatientHeader() {

    const navigate = useNavigate();

    return (

        <div className="flex items-center justify-between mb-8">

            <div>

                <h1 className="text-4xl font-bold text-slate-800">
                    Patients
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all registered patients in your organization.
                </p>

            </div>

            <button
                onClick={() => navigate("/patients/add")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >

                <UserPlus size={20} />

                Add Patient

            </button>

        </div>

    );
}

export default PatientHeader;
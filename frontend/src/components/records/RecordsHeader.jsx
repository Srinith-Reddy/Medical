import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RecordsHeader() {

    const navigate = useNavigate();

    return (

        <div className="flex items-center justify-between mb-8">

            <div>

                <h1 className="text-4xl font-bold text-slate-800">
                    Medical Records
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage and verify patient medical records.
                </p>

            </div>

            <button
                onClick={() => navigate("/records/upload")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >

                <Upload size={20} />

                Upload Record

            </button>

        </div>

    );

}

export default RecordsHeader;
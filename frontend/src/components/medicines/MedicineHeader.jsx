import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MedicineHeader() {

    const navigate = useNavigate();

    return (

        <div className="flex items-center justify-between mb-8">

            <div>

                <h1 className="text-4xl font-bold text-slate-800">
                    Medicines
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage medicines available in the system.
                </p>

            </div>

            <button
                onClick={() => navigate("/medicines/add")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
            >
                <Plus size={18} />

                Add Medicine

            </button>

        </div>

    );

}

export default MedicineHeader;
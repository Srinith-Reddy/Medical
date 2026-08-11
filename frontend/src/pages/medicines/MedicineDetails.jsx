import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getMedicineById } from "../../services/medicineService";

function MedicineDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [medicine, setMedicine] = useState(null);

    useEffect(() => {

        loadMedicine();

    }, []);

    const loadMedicine = async () => {

        try {

            const data = await getMedicineById(id);
            setMedicine(data);

        } catch (error) {

            console.error("Error fetching medicine:", error);

        }

    };

    if (!medicine) {

        return (

            <DashboardLayout>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">

                    <h2 className="text-2xl font-semibold">
                        Loading medicine...
                    </h2>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">

                <h1 className="text-4xl font-bold text-slate-800 mb-10">

                    Medicine Details

                </h1>

                <div className="grid grid-cols-2 gap-10">

                    <div>

                        <p className="text-gray-500 mb-2">
                            Medicine Name
                        </p>

                        <h2 className="text-2xl font-semibold">
                            {medicine.name}
                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500 mb-2">
                            Generic Name
                        </p>

                        <h2 className="text-2xl font-semibold">
                            {medicine.generic_name}
                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500 mb-2">
                            Category
                        </p>

                        <h2 className="text-2xl font-semibold">
                            {medicine.category}
                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500 mb-2">
                            Standard Dosage
                        </p>

                        <h2 className="text-2xl font-semibold">
                            {medicine.standard_dosage}
                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500 mb-2">
                            Manufacturer
                        </p>

                        <h2 className="text-2xl font-semibold">
                            {medicine.manufacturer}
                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500 mb-2">
                            Form
                        </p>

                        <h2 className="text-2xl font-semibold">
                            {medicine.form}
                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500 mb-2">
                            Prescription Required
                        </p>

                        <span
                            className={`inline-block px-4 py-2 rounded-full font-semibold ${
                                medicine.requires_rx
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {medicine.requires_rx ? "Yes" : "No"}
                        </span>

                    </div>

                </div>

                <button

                    onClick={() => navigate("/medicines")}

                    className="mt-12 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl"

                >

                    ← Back to Medicines

                </button>

            </div>

        </DashboardLayout>

    );

}

export default MedicineDetails;
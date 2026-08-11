import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllMedicines } from "../../services/medicineService";

function MedicineTable({ searchTerm }) {

    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loadMedicines = async () => {

        try {

            const data = await getAllMedicines();
            setMedicines(data);

        } catch (error) {

            console.error("Error fetching medicines:", error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadMedicines();

    }, []);

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {

        return (

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">

                Loading medicines...

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="text-left px-6 py-4">Medicine</th>

                        <th className="text-left px-6 py-4">Generic Name</th>

                        <th className="text-left px-6 py-4">Category</th>

                        <th className="text-left px-6 py-4">Dosage</th>

                        <th className="text-left px-6 py-4">Manufacturer</th>

                        <th className="text-left px-6 py-4">Form</th>

                        <th className="text-center px-6 py-4">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredMedicines.length > 0 ? (

                        filteredMedicines.map((medicine) => (

                            <tr
                                key={medicine.id}
                                className="border-t hover:bg-slate-50 transition"
                            >

                                <td className="px-6 py-5 font-semibold">
                                    {medicine.name}
                                </td>

                                <td className="px-6 py-5">
                                    {medicine.generic_name}
                                </td>

                                <td className="px-6 py-5">
                                    {medicine.category}
                                </td>

                                <td className="px-6 py-5">
                                    {medicine.standard_dosage}
                                </td>

                                <td className="px-6 py-5">
                                    {medicine.manufacturer}
                                </td>

                                <td className="px-6 py-5">
                                    {medicine.form}
                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex justify-center">

                                        <button
                                            onClick={() =>
                                                navigate(`/medicines/${medicine.id}`)
                                            }
                                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                                        >

                                            <Eye size={18} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center py-10"
                            >

                                <div>

                                    <p className="text-lg font-semibold">
                                        💊 No medicines found
                                    </p>

                                    <p className="text-gray-500 mt-2">
                                        Try adding a new medicine.
                                    </p>

                                </div>

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default MedicineTable;
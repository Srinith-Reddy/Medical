import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllPatients } from "../../services/patientService";

function PatientTable({ searchTerm }) {

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loadPatients = async () => {

        try {

            const data = await getAllPatients();

            setPatients(data);

        } catch (error) {

            console.error("Error fetching patients:", error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadPatients();

    }, []);

    const filteredPatients = patients.filter((patient) =>
        patient.name
            .toLowerCase()
            .includes((searchTerm || "").toLowerCase())
    );

    if (loading) {

        return (

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-gray-500">

                Loading patients...

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="text-left px-6 py-4">
                            Patient
                        </th>

                        <th className="text-left px-6 py-4">
                            Gender
                        </th>

                        <th className="text-left px-6 py-4">
                            Blood Group
                        </th>

                        <th className="text-left px-6 py-4">
                            Phone
                        </th>

                        <th className="text-left px-6 py-4">
                            Height
                        </th>

                        <th className="text-left px-6 py-4">
                            Weight
                        </th>

                        <th className="text-center px-6 py-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredPatients.length > 0 ? (

                        filteredPatients.map((patient) => (

                            <tr
                                key={patient.id}
                                className="border-t hover:bg-slate-50 transition"
                            >

                                <td className="px-6 py-5 font-semibold">

                                    {patient.name}

                                </td>

                                <td className="px-6 py-5">

                                    {patient.gender}

                                </td>

                                <td className="px-6 py-5">

                                    {patient.blood_group}

                                </td>

                                <td className="px-6 py-5">

                                    {patient.phone}

                                </td>

                                <td className="px-6 py-5">

                                    {patient.height} cm

                                </td>

                                <td className="px-6 py-5">

                                    {patient.weight} kg

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => navigate(`/patients/${patient.id}`)}
                                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                                        >

                                            <Eye size={18} />

                                        </button>

                                        <button
                                            onClick={() => navigate(`/patients/edit/${patient.id}`)}
                                            className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
                                        >

                                            <Pencil size={18} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center py-10 text-gray-500"
                            >

                                No patients found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default PatientTable;
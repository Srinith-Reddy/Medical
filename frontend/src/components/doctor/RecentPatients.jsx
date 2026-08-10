import { useEffect, useState } from "react";
import { getAllPatients } from "../../services/patientService";

function RecentPatients() {

    const [patients, setPatients] = useState([]);

    const loadPatients = async () => {
        try {
            const data = await getAllPatients();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

    return (

        <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-8 mt-8">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-slate-800">
                    Recent Patients
                </h2>

                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    View All →
                </button>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-gray-500">

                            <th className="text-left pb-4 font-semibold">
                                Patient
                            </th>

                            <th className="text-left pb-4 font-semibold">
                                Gender
                            </th>

                            <th className="text-left pb-4 font-semibold">
                                Blood Group
                            </th>

                            <th className="text-left pb-4 font-semibold">
                                Height
                            </th>

                            <th className="text-left pb-4 font-semibold">
                                Weight
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {patients.map((patient) => (

                            <tr
                                key={patient.id}
                                className="border-b last:border-0 hover:bg-slate-50 transition"
                            >

                                <td className="py-5 font-semibold text-slate-800">
                                    {patient.name}
                                </td>

                                <td className="py-5">
                                    {patient.gender}
                                </td>

                                <td className="py-5">
                                    {patient.blood_group}
                                </td>

                                <td className="py-5">
                                    {patient.height} cm
                                </td>

                                <td className="py-5">
                                    {patient.weight} kg
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default RecentPatients;
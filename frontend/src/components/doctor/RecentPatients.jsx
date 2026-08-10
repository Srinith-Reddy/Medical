function RecentPatients() {

    const patients = [
        {
            name: "Aarav Sharma",
            blood: "O+",
            diagnosis: "Viral Fever",
            visit: "Today",
            status: "Recovered"
        },
        {
            name: "Priya Reddy",
            blood: "B+",
            diagnosis: "Diabetes",
            visit: "Yesterday",
            status: "Monitoring"
        },
        {
            name: "Rahul Kumar",
            blood: "A+",
            diagnosis: "Migraine",
            visit: "3 Aug",
            status: "Medication"
        },
        {
            name: "Ananya Gupta",
            blood: "AB+",
            diagnosis: "Hypertension",
            visit: "2 Aug",
            status: "Critical"
        }
    ];

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
                                Blood Group
                            </th>

                            <th className="text-left pb-4 font-semibold">
                                Diagnosis
                            </th>

                            <th className="text-left pb-4 font-semibold">
                                Last Visit
                            </th>

                            <th className="text-left pb-4 font-semibold">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {patients.map((patient, index) => (

                            <tr
                                key={index}
                                className="border-b last:border-0 hover:bg-slate-50 transition"
                            >

                                <td className="py-5 font-semibold text-slate-800">
                                    {patient.name}
                                </td>

                                <td className="py-5">
                                    {patient.blood}
                                </td>

                                <td className="py-5">
                                    {patient.diagnosis}
                                </td>

                                <td className="py-5 text-gray-500">
                                    {patient.visit}
                                </td>

                                <td className="py-5">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${
                                            patient.status === "Recovered"
                                                ? "bg-green-100 text-green-700"
                                                : patient.status === "Monitoring"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : patient.status === "Medication"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >

                                        {patient.status}

                                    </span>

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
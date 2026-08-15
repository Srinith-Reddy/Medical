function RecentPatients({ patients = [] }) {

    const recentPatients = patients.slice(0, 5);

    return (

        <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-8 mt-8">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Recent Patients
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Patients currently registered in the system
                    </p>

                </div>

            </div>


            <div className="overflow-x-auto">

                {recentPatients.length === 0 ? (

                    <div className="text-center py-10 text-gray-500">

                        No patients found.

                    </div>

                ) : (

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

                            {recentPatients.map((patient) => (

                                <tr
                                    key={patient.id}
                                    className="border-b last:border-0 hover:bg-slate-50 transition"
                                >

                                    <td className="py-5 font-semibold text-slate-800">
                                        {patient.name}
                                    </td>

                                    <td className="py-5">
                                        {patient.gender || "-"}
                                    </td>

                                    <td className="py-5">
                                        {patient.blood_group || "-"}
                                    </td>

                                    <td className="py-5">
                                        {patient.height
                                            ? `${patient.height} cm`
                                            : "-"
                                        }
                                    </td>

                                    <td className="py-5">
                                        {patient.weight
                                            ? `${patient.weight} kg`
                                            : "-"
                                        }
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

}

export default RecentPatients;
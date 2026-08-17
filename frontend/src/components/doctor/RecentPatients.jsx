import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";


function RecentPatients({
    patients = []
}) {

    const navigate = useNavigate();


    // Show at most 5 patients on dashboard

    const recentPatients =
        patients.slice(0, 5);


    return (

        <div className="
            bg-white
            rounded-[28px]
            shadow-sm
            border
            border-gray-200
            p-8
            mt-8
        ">

            <div className="
                flex
                justify-between
                items-center
                mb-6
            ">

                <div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-slate-800
                    ">
                        My Patients
                    </h2>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Patients associated with your appointments
                    </p>

                </div>


                <button
                    onClick={() => navigate("/patients")}
                    className="
                        text-blue-600
                        hover:text-blue-700
                        font-semibold
                    "
                >
                    View All
                </button>

            </div>


            {recentPatients.length === 0 ? (

                <div className="
                    py-10
                    text-center
                    text-gray-500
                ">

                    No patients found.

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="
                                border-b
                                text-gray-500
                            ">

                                <th className="
                                    text-left
                                    pb-4
                                    font-semibold
                                ">
                                    Patient
                                </th>


                                <th className="
                                    text-left
                                    pb-4
                                    font-semibold
                                ">
                                    Gender
                                </th>


                                <th className="
                                    text-left
                                    pb-4
                                    font-semibold
                                ">
                                    Blood Group
                                </th>


                                <th className="
                                    text-left
                                    pb-4
                                    font-semibold
                                ">
                                    Height
                                </th>


                                <th className="
                                    text-left
                                    pb-4
                                    font-semibold
                                ">
                                    Weight
                                </th>


                                <th className="
                                    text-center
                                    pb-4
                                    font-semibold
                                ">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {recentPatients.map(
                                (patient) => (

                                    <tr
                                        key={patient.id}
                                        className="
                                            border-b
                                            last:border-0
                                            hover:bg-slate-50
                                            transition
                                        "
                                    >

                                        <td className="
                                            py-5
                                            font-semibold
                                            text-slate-800
                                        ">
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


                                        <td className="py-5">

                                            <div className="
                                                flex
                                                justify-center
                                            ">

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/patients/${patient.id}`
                                                        )
                                                    }
                                                    className="
                                                        p-2
                                                        rounded-lg
                                                        bg-blue-100
                                                        text-blue-600
                                                        hover:bg-blue-200
                                                        transition
                                                    "
                                                >

                                                    <Eye
                                                        size={18}
                                                    />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}


export default RecentPatients;
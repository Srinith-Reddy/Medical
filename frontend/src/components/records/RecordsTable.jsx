import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RecordsTable() {

    const navigate = useNavigate();

    const records = [

        {
            id: 1,
            patient: "Srinith",
            file: "MRI_Report.pdf",
            date: "Today",
            status: "Verified"
        },

        {
            id: 2,
            patient: "Rahul",
            file: "Blood_Test.pdf",
            date: "Yesterday",
            status: "Pending"
        },

        {
            id: 3,
            patient: "Ananya",
            file: "CT_Scan.pdf",
            date: "08 Aug",
            status: "Verified"
        }

    ];

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="text-left px-6 py-4">
                            Patient
                        </th>

                        <th className="text-left px-6 py-4">
                            File
                        </th>

                        <th className="text-left px-6 py-4">
                            Uploaded
                        </th>

                        <th className="text-left px-6 py-4">
                            Status
                        </th>

                        <th className="text-center px-6 py-4">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {records.map((record) => (

                        <tr
                            key={record.id}
                            className="border-t hover:bg-slate-50 transition"
                        >

                            <td className="px-6 py-5 font-semibold">
                                {record.patient}
                            </td>

                            <td className="px-6 py-5">
                                {record.file}
                            </td>

                            <td className="px-6 py-5">
                                {record.date}
                            </td>

                            <td className="px-6 py-5">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        record.status === "Verified"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >

                                    {record.status}

                                </span>

                            </td>

                            <td className="px-6 py-5">

                                <div className="flex justify-center">

                                    <button
                                        onClick={() => navigate(`/records/${record.id}`)}
                                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                                    >

                                        <Eye size={18} />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecordsTable;
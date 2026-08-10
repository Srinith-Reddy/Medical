const reports = [
    {
        patient: "Rahul Sharma",
        test: "CBC",
        status: "Completed"
    },
    {
        patient: "Ananya Rao",
        test: "Liver Function Test",
        status: "Completed"
    },
    {
        patient: "Vikram Singh",
        test: "Blood Sugar",
        status: "Completed"
    },
    {
        patient: "Sneha Patel",
        test: "Lipid Profile",
        status: "Completed"
    }
];

function RecentReports() {
    return (

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-200 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                📄 Recent Reports
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-left border-b">

                        <th className="pb-3">Patient</th>
                        <th className="pb-3">Test</th>
                        <th className="pb-3">Status</th>

                    </tr>

                </thead>

                <tbody>

                    {reports.map((report, index) => (

                        <tr
                            key={index}
                            className="border-b"
                        >

                            <td className="py-4">
                                {report.patient}
                            </td>

                            <td>
                                {report.test}
                            </td>

                            <td>

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                    {report.status}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default RecentReports;
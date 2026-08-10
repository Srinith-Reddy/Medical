function MedicalAlerts() {

    const alerts = [
        {
            title: "Penicillin Allergy",
            patient: "Priya Reddy",
            severity: "High"
        },
        {
            title: "High Blood Pressure",
            patient: "Rahul Kumar",
            severity: "Medium"
        },
        {
            title: "Diabetes Monitoring",
            patient: "Aarav Sharma",
            severity: "Medium"
        },
        {
            title: "Heart Rate Critical",
            patient: "Ananya Gupta",
            severity: "Critical"
        }
    ];

    return (

        <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-8">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-slate-800">
                    Medical Alerts
                </h2>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {alerts.length} Alerts
                </span>

            </div>

            <div className="space-y-5">

                {alerts.map((alert, index) => (

                    <div
                        key={index}
                        className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
                    >

                        <div className="flex justify-between items-center">

                            <h3 className="font-semibold text-slate-800">
                                ⚠ {alert.title}
                            </h3>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${
                                    alert.severity === "Critical"
                                        ? "bg-red-100 text-red-700"
                                        : alert.severity === "High"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {alert.severity}
                            </span>

                        </div>

                        <p className="text-gray-500 mt-3">

                            Patient:
                            <span className="font-medium text-slate-700">
                                {" "}{alert.patient}
                            </span>

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default MedicalAlerts;
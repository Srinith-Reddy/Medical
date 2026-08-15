import { AlertCircle } from "lucide-react";


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


    const severityStyles = {
        Critical: "bg-red-50 text-red-700 border-red-100",
        High: "bg-orange-50 text-orange-700 border-orange-100",
        Medium: "bg-amber-50 text-amber-700 border-amber-100"
    };


    return (

        <div className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            shadow-sm
            p-6
        ">

            {/* Header */}

            <div className="
                flex
                items-start
                justify-between
                mb-5
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Medical Alerts
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        Items requiring attention
                    </p>

                </div>


                <AlertCircle
                    size={20}
                    className="text-slate-400"
                />

            </div>


            {/* Alerts */}

            <div className="space-y-3">

                {alerts.map((alert, index) => (

                    <div
                        key={index}
                        className="
                            border
                            border-slate-100
                            rounded-xl
                            px-4
                            py-3
                        "
                    >

                        <div className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        ">

                            <div>

                                <h3 className="
                                    text-sm
                                    font-medium
                                    text-slate-900
                                ">
                                    {alert.title}
                                </h3>

                                <p className="
                                    text-xs
                                    text-slate-500
                                    mt-1
                                ">
                                    {alert.patient}
                                </p>

                            </div>


                            <span
                                className={`
                                    text-xs
                                    font-medium
                                    px-2.5
                                    py-1
                                    rounded-md
                                    border
                                    whitespace-nowrap
                                    ${
                                        severityStyles[
                                            alert.severity
                                        ]
                                    }
                                `}
                            >
                                {alert.severity}
                            </span>

                        </div>

                    </div>

                ))}

            </div>


            {/* Footer */}

            <button
                className="
                    w-full
                    mt-5
                    pt-4
                    border-t
                    border-slate-100
                    text-sm
                    font-medium
                    text-blue-600
                    hover:text-blue-700
                    transition
                "
            >
                View all alerts
            </button>

        </div>

    );

}


export default MedicalAlerts;
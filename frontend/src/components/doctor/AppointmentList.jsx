import { CalendarDays } from "lucide-react";


function AppointmentList() {

    const appointments = [
        {
            patient: "Aarav Sharma",
            time: "09:00 AM",
            type: "General Checkup"
        },
        {
            patient: "Priya Reddy",
            time: "09:30 AM",
            type: "Follow-up"
        },
        {
            patient: "Rahul Kumar",
            time: "10:15 AM",
            type: "Consultation"
        }
    ];


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
                items-center
                justify-between
                mb-6
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Today's Appointments
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        Your upcoming appointments for today
                    </p>

                </div>


                <CalendarDays
                    size={20}
                    className="text-slate-400"
                />

            </div>


            {/* Appointment List */}

            <div className="divide-y divide-slate-100">

                {appointments.map((appointment, index) => (

                    <div
                        key={index}
                        className="
                            flex
                            items-center
                            justify-between
                            py-4
                            first:pt-0
                            last:pb-0
                        "
                    >

                        <div className="flex items-center gap-4">

                            {/* Time */}

                            <div className="
                                w-20
                                text-sm
                                font-medium
                                text-slate-700
                            ">
                                {appointment.time}
                            </div>


                            {/* Patient */}

                            <div>

                                <h3 className="
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                ">
                                    {appointment.patient}
                                </h3>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-0.5
                                ">
                                    {appointment.type}
                                </p>

                            </div>

                        </div>


                        {/* Status */}

                        <span className="
                            text-xs
                            font-medium
                            text-slate-500
                            bg-slate-100
                            px-3
                            py-1.5
                            rounded-lg
                        ">
                            Scheduled
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}


export default AppointmentList;
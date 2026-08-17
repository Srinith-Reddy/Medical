import { CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


function AppointmentList({
    appointments = []
}) {

    const navigate = useNavigate();


    // --------------------------------------------------
    // FORMAT TIME
    // --------------------------------------------------

    const formatTime = (dateString) => {

        if (!dateString) {
            return "--";
        }

        const date = new Date(dateString);

        return date.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    // --------------------------------------------------
    // CHECK IF TODAY
    // --------------------------------------------------

    const isToday = (dateString) => {

        if (!dateString) {
            return false;
        }

        const date = new Date(dateString);
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );

    };


    // --------------------------------------------------
    // TODAY'S APPOINTMENTS
    // --------------------------------------------------

    const todaysAppointments =
        appointments.filter(
            (appointment) =>
                isToday(
                    appointment.appointment_date
                )
        );


    // --------------------------------------------------
    // START CONSULTATION
    // --------------------------------------------------

    const handleStartConsultation = (appointment) => {

        navigate(
            `/doctor/appointments/${appointment.id}`
        );

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
                        Your appointments scheduled for today
                    </p>

                </div>

                <CalendarDays
                    size={20}
                    className="text-slate-400"
                />

            </div>


            {/* No appointments */}

            {todaysAppointments.length === 0 && (

                <div className="
                    py-10
                    text-center
                    text-sm
                    text-slate-500
                ">

                    No appointments scheduled for today.

                </div>

            )}


            {/* Appointment List */}

            {todaysAppointments.length > 0 && (

                <div className="
                    divide-y
                    divide-slate-100
                ">

                    {todaysAppointments.map(
                        (appointment) => {

                            const patient =
                                appointment.patient;

                            const status =
                                appointment.status?.toUpperCase();


                            return (

                                <div
                                    key={appointment.id}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        py-4
                                        first:pt-0
                                        last:pb-0
                                    "
                                >

                                    {/* Patient information */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">

                                        <div className="
                                            w-20
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        ">

                                            {formatTime(
                                                appointment.appointment_date
                                            )}

                                        </div>


                                        <div>

                                            <h3 className="
                                                text-sm
                                                font-semibold
                                                text-slate-900
                                            ">

                                                {patient?.name ||
                                                    "Patient"
                                                }

                                            </h3>


                                            <p className="
                                                text-sm
                                                text-slate-500
                                                mt-0.5
                                            ">

                                                Appointment

                                            </p>

                                        </div>

                                    </div>


                                    {/* Right side */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        {/* Status */}

                                        <span className="
                                            text-xs
                                            font-medium
                                            text-slate-600
                                            bg-slate-100
                                            px-3
                                            py-1.5
                                            rounded-lg
                                        ">

                                            {appointment.status ||
                                                "Scheduled"
                                            }

                                        </span>


                                        {/* Start Consultation */}

                                        {status === "SCHEDULED" && (

                                            <button
                                                onClick={() =>
                                                    handleStartConsultation(
                                                        appointment
                                                    )
                                                }
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    bg-blue-600
                                                    text-white
                                                    text-sm
                                                    font-medium
                                                    hover:bg-blue-700
                                                    transition
                                                "
                                            >

                                                Start Consultation

                                                <ArrowRight
                                                    size={16}
                                                />

                                            </button>

                                        )}


                                        {/* View Consultation */}

                                        {status === "COMPLETED" && (

                                            <button
                                                onClick={() =>
                                                    handleStartConsultation(
                                                        appointment
                                                    )
                                                }
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    bg-slate-100
                                                    text-slate-700
                                                    text-sm
                                                    font-medium
                                                    hover:bg-slate-200
                                                    transition
                                                "
                                            >

                                                View Consultation

                                                <ArrowRight
                                                    size={16}
                                                />

                                            </button>

                                        )}

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}


export default AppointmentList;
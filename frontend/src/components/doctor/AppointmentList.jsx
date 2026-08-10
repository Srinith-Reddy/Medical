function AppointmentList() {

    const appointments = [
        {
            patient: "Aarav Sharma",
            time: "09:00 AM"
        },
        {
            patient: "Priya Reddy",
            time: "09:30 AM"
        },
        {
            patient: "Rahul Kumar",
            time: "10:15 AM"
        }
    ];

    return (

        <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-8">

            <h2 className="text-2xl font-bold mb-6">
                Today's Appointments
            </h2>

            <div className="space-y-5">

                {appointments.map((appointment, index) => (

                    <div
                        key={index}
                        className="flex justify-between items-center border-b pb-4"
                    >

                        <div>

                            <h3 className="font-semibold">
                                {appointment.patient}
                            </h3>

                            <p className="text-gray-500">
                                General Checkup
                            </p>

                        </div>

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">

                            {appointment.time}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default AppointmentList;
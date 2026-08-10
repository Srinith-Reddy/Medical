function DoctorHero({ doctor }) {

    return (
        <div className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] rounded-[32px] p-10 text-white shadow-xl">

            <p className="uppercase tracking-[0.3em] text-blue-100 text-xs font-medium">
                DOCTOR DASHBOARD
            </p>

            <h1 className="text-5xl font-bold mt-3">
                Good Morning, Dr. {doctor?.name || "Doctor"} 👋
            </h1>

            <p className="mt-3 text-blue-100 text-xl">
                {doctor?.specialization || "General"} Specialist
            </p>

            <div className="grid grid-cols-3 gap-8 mt-10">

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

                    <p className="text-blue-100 text-sm uppercase tracking-wide">
                        Today's Appointments
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        12
                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

                    <p className="text-blue-100 text-sm uppercase tracking-wide">
                        Active Patients
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        124
                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

                    <p className="text-blue-100 text-sm uppercase tracking-wide">
                        Emergency Cases
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        2
                    </p>

                </div>

            </div>

        </div>
    );
}

export default DoctorHero;
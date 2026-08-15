function DoctorHero({ doctor }) {

    return (

        <div className="bg-white border border-slate-200 rounded-2xl px-8 py-7 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <p className="
                        text-sm
                        font-medium
                        text-slate-500
                        uppercase
                        tracking-wider
                    ">
                        Doctor Dashboard
                    </p>

                    <h1 className="
                        text-3xl
                        font-semibold
                        text-slate-900
                        mt-2
                    ">
                        Good morning, Dr. {doctor?.name || "Doctor"}
                    </h1>

                    <p className="
                        text-slate-500
                        mt-2
                    ">
                        {doctor?.specialization
                            ? `${doctor.specialization} Specialist`
                            : "Medical Practitioner"
                        }
                    </p>

                </div>

                <div className="
                    hidden
                    md:flex
                    items-center
                    justify-center
                    w-12
                    h-12
                    rounded-full
                    bg-slate-100
                    text-slate-700
                    font-semibold
                    text-lg
                ">
                    {doctor?.name
                        ? doctor.name.charAt(0).toUpperCase()
                        : "D"
                    }
                </div>

            </div>

            <div className="
                mt-6
                pt-5
                border-t
                border-slate-100
                flex
                flex-wrap
                gap-x-8
                gap-y-2
                text-sm
                text-slate-500
            ">

                <span>
                    Today's schedule and patient activity
                </span>

                <span>
                    Organization Portal
                </span>

            </div>

        </div>

    );

}

export default DoctorHero;
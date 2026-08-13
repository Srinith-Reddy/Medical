function OrganizationStats({
    doctorCount = 0,
    appointmentCount = 0,
}) {

    const cards = [

        {
            title: "Doctors",
            value: doctorCount,
            color: "bg-blue-100 text-blue-600",
        },

        {
            title: "Appointments",
            value: appointmentCount,
            color: "bg-sky-100 text-sky-600",
        },

    ];


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="
                        bg-white
                        rounded-[28px]
                        border
                        border-slate-200
                        p-7
                        shadow-sm
                        hover:shadow-md
                        transition
                    "
                >

                    <div
                        className={`
                            w-12
                            h-12
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                            ${card.color}
                        `}
                    >
                        <div className="w-3 h-3 rounded-full bg-current" />
                    </div>


                    <p className="mt-5 text-slate-500 text-sm">
                        {card.title}
                    </p>


                    <h2 className="text-4xl font-bold mt-2 text-slate-900">
                        {card.value}
                    </h2>

                </div>

            ))}

        </div>

    );

}

export default OrganizationStats;
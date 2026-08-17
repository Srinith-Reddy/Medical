import {
    CalendarDays,
    Users,
    ClipboardList,
    FileText
} from "lucide-react";


function DoctorStats({
    appointments = 0,
    patients = 0,
    prescriptions = 0,
    reports = 0
}) {

    const stats = [
        {
            title: "Appointments",
            value: appointments,
            icon: CalendarDays
        },
        {
            title: "Patients",
            value: patients,
            icon: Users
        },
        {
            title: "Prescriptions",
            value: prescriptions,
            icon: ClipboardList
        },
        {
            title: "Medical Records",
            value: reports,
            icon: FileText
        }
    ];


    return (

        <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            mt-6
        ">

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (

                    <div
                        key={stat.title}
                        className="
                            bg-white
                            border
                            border-slate-200
                            rounded-2xl
                            px-6
                            py-5
                            shadow-sm
                            hover:shadow-md
                            transition
                        "
                    >

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <p className="
                                text-sm
                                font-medium
                                text-slate-500
                            ">
                                {stat.title}
                            </p>

                            <Icon
                                size={19}
                                className="text-slate-400"
                            />

                        </div>


                        <p className="
                            text-3xl
                            font-semibold
                            text-slate-900
                            mt-3
                        ">
                            {stat.value}
                        </p>

                    </div>

                );

            })}

        </div>

    );

}


export default DoctorStats;
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    ClipboardList,
    FileText,
    Pill,
    Settings
} from "lucide-react";

function DoctorSidebar() {

    const menu = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/doctor"
        },
        {
            name: "Appointments",
            icon: CalendarDays,
            path: "/appointments"
        },
        {
            name: "Patients",
            icon: Users,
            path: "/patients"
        },
        {
            name: "Prescriptions",
            icon: ClipboardList,
            path: "/prescriptions"
        },
        {
            name: "Medical Records",
            icon: FileText,
            path: "/records"
        },
        {
            name: "Medicines",
            icon: Pill,
            path: "/medicines"
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/settings"
        }
    ];

    return (
        <aside className="w-64 bg-white shadow-lg min-h-screen">

            <div className="p-6 border-b">
                <h1 className="text-3xl font-bold text-blue-600">
                    MedChain
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Doctor Portal
                </p>
            </div>

            <nav className="mt-8 space-y-2 px-4">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-slate-100 text-slate-700"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {item.name}
                        </NavLink>

                    );

                })}

            </nav>

        </aside>
    );
}

export default DoctorSidebar;
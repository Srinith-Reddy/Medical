import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FileText,
    ClipboardList,
    Settings
} from "lucide-react";

function Sidebar() {

    const menu = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/patient"
        },
        {
            name: "Patients",
            icon: Users,
            path: "/patients"
        },
        {
            name: "Medical Records",
            icon: FileText,
            path: "/records"
        },
        {
            name: "Prescriptions",
            icon: ClipboardList,
            path: "/prescriptions"
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
                    Patient Portal
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
                                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span className="font-medium">
                                {item.name}
                            </span>

                        </NavLink>

                    );

                })}

            </nav>

        </aside>
    );
}

export default Sidebar;
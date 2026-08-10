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
            path: "/doctor"
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

            <div className="p-6 text-2xl font-bold text-blue-600 border-b">

                MedChain

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

export default Sidebar;
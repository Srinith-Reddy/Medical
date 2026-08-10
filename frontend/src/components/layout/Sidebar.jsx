import {
    Building2,
    Stethoscope,
    FlaskConical,
    Settings,
    LogOut,
    ShieldPlus,
    Users,
    FileText,
    ClipboardList
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

    // 🔥 Temporary role
    // Later this will come from the logged-in user
    const role = "DOCTOR";
    // const role = "ADMIN";
    // const role = "LAB";

    const adminMenu = [
        {
            name: "Organization",
            icon: Building2,
            path: "/organization"
        },
        {
            name: "Doctors",
            icon: Stethoscope,
            path: "/doctor"
        },
        {
            name: "Laboratory",
            icon: FlaskConical,
            path: "/lab"
        },
        {
            name: "Staff",
            icon: Users,
            path: "/staff"
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/settings"
        }
    ];

    const doctorMenu = [
        {
            name: "Dashboard",
            icon: Building2,
            path: "/doctor"
        },
        {
            name: "Patients",
            icon: Users,
            path: "/patients"
        },
        {
            name: "Appointments",
            icon: ClipboardList,
            path: "/appointments"
        },
        {
            name: "Prescriptions",
            icon: FileText,
            path: "/prescriptions"
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/settings"
        }
    ];

    const labMenu = [
        {
            name: "Dashboard",
            icon: Building2,
            path: "/lab"
        },
        {
            name: "Test Queue",
            icon: ClipboardList,
            path: "/tests"
        },
        {
            name: "Reports",
            icon: FileText,
            path: "/reports"
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/settings"
        }
    ];

    let menu = [];

    if (role === "ADMIN") {
        menu = adminMenu;
    }
    else if (role === "DOCTOR") {
        menu = doctorMenu;
    }
    else {
        menu = labMenu;
    }

    return (

        <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

            <div className="p-8 border-b border-slate-700">

                <div className="flex items-center gap-3">

                    <ShieldPlus size={34} />

                    <div>

                        <h1 className="font-bold text-xl">
                            MedChain
                        </h1>

                        <p className="text-slate-400 text-sm">
                            Healthcare Platform
                        </p>

                    </div>

                </div>

            </div>

            <div className="flex-1 mt-6">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-8 py-4 transition-all duration-300 ${
                                    isActive
                                        ? "bg-blue-600 border-r-4 border-white"
                                        : "hover:bg-slate-800"
                                }`
                            }
                        >

                            <Icon size={22} />

                            <span className="font-medium">
                                {item.name}
                            </span>

                        </NavLink>

                    );

                })}

            </div>

            <button className="flex items-center gap-4 px-8 py-6 hover:bg-red-600 transition">

                <LogOut size={22} />

                Logout

            </button>

        </div>

    );

}

export default Sidebar;
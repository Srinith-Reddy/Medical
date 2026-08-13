import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Building2,
    Users,
    Stethoscope,
    CalendarDays,
    Settings
} from "lucide-react";


function OrganizationSidebar() {

    const menu = [

        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/organization",
            end: true
        },

        {
            name: "Organizations",
            icon: Building2,
            path: "/organizations"
        },

        {
            name: "Doctors",
            icon: Stethoscope,
            path: "/organization/doctors"
        },

        {
            name: "Appointments",
            icon: CalendarDays,
            path: "/organization/appointments"
        },

        {
            name: "Patients",
            icon: Users,
            path: "/patients"
        },

        {
            name: "Settings",
            icon: Settings,
            path: "/settings"
        }

    ];


    return (

        <aside className="w-64 bg-white shadow-lg min-h-screen">

            {/* Logo */}

            <div className="p-6 border-b">

                <h1 className="text-3xl font-bold text-blue-600">
                    MedChain
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Organization Portal
                </p>

            </div>


            {/* Navigation */}

            <nav className="mt-8 space-y-2 px-4">

                {menu.map((item) => {

                    const Icon = item.icon;


                    return (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3
                                transition

                                ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                }
                                `
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

export default OrganizationSidebar;
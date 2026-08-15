import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

function Topbar() {

    const location = useLocation();

    const isOrganization =
        location.pathname.startsWith("/organization");

    const userName = isOrganization
        ? "Runio"
        : "Dr. Srinith";

    const userRole = isOrganization
        ? "Organization"
        : "Doctor";

    const avatarLetter = isOrganization
        ? "R"
        : "S";


    return (

        <div className="bg-white h-20 rounded-3xl shadow-sm px-8 flex items-center justify-between">

            {/* Search */}

            <div className="flex items-center gap-3 bg-slate-100 px-5 py-3 rounded-2xl">

                <Search size={18} />

                <input
                    placeholder="Search..."
                    className="bg-transparent outline-none"
                />

            </div>


            {/* User Section */}

            <div className="flex items-center gap-6">

                <Bell />

                <div className="text-right">

                    <h3 className="font-semibold">
                        {userName}
                    </h3>

                    <p className="text-gray-500 text-sm">
                        {userRole}
                    </p>

                </div>


                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

                    {avatarLetter}

                </div>

            </div>

        </div>

    );

}

export default Topbar;
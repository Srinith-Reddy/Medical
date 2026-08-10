import { Bell, Search } from "lucide-react";

function Topbar() {

    return (

        <div className="bg-white h-20 rounded-3xl shadow-sm px-8 flex items-center justify-between">

            <div className="flex items-center gap-3 bg-slate-100 px-5 py-3 rounded-2xl">

                <Search size={18} />

                <input
                    placeholder="Search..."
                    className="bg-transparent outline-none"
                />

            </div>

            <div className="flex items-center gap-6">

                <Bell />

                <div className="text-right">

                    <h3 className="font-semibold">
                        Dr. Srinith
                    </h3>

                    <p className="text-gray-500 text-sm">
                        Doctor
                    </p>

                </div>

                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

                    S

                </div>

            </div>

        </div>

    );

}

export default Topbar;
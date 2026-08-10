import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {

    return (

        <div className="flex bg-slate-100">

            <Sidebar />

            <div className="flex-1 p-8">

                <Topbar />

                <div className="mt-8">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;
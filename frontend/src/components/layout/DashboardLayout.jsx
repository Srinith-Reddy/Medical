import Topbar from "./Topbar";

function DashboardLayout({ children, sidebar }) {

    return (

        <div className="flex bg-slate-100 min-h-screen">

            {sidebar}

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
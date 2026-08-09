import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 bg-slate-100 p-8 overflow-y-auto">

            <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-800">
                    Good Evening, Chetana 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Here's your health overview.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-white rounded-3xl shadow-sm p-6">
                    Heart Rate
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6">
                    Prescriptions
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6">
                    Reports
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
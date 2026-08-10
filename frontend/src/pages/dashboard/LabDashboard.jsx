import LabHero from "../../components/lab/LabHero";
import LabStats from "../../components/lab/LabStats";
import TestQueue from "../../components/lab/TestQueue";
import UrgentSamples from "../../components/lab/UrgentSamples";
import RecentReports from "../../components/lab/RecentReports";

function LabDashboard() {
    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <LabHero />

            <LabStats />

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2">
                    <TestQueue />
                </div>

                <div>
                    <UrgentSamples />
                </div>

            </div>

            <RecentReports />

        </div>
    );
}

export default LabDashboard;
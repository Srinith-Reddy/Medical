import LabHero from "../../components/lab/LabHero";
import LabStats from "../../components/lab/LabStats";
import TestQueue from "../../components/lab/TestQueue";
import UrgentSamples from "../../components/lab/UrgentSamples";
import RecentReports from "../../components/lab/RecentReports";

import DashboardLayout from "../../components/layout/DashboardLayout";
import LabSidebar from "../../components/sidebar/LabSidebar";

function LabDashboard() {

    return (

        <DashboardLayout
            sidebar={<LabSidebar />}
        >

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

        </DashboardLayout>

    );

}

export default LabDashboard;
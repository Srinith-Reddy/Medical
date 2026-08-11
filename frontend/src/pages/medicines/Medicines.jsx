import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import MedicineHeader from "../../components/medicines/MedicineHeader";
import MedicineSearch from "../../components/medicines/MedicineSearch";
import MedicineTable from "../../components/medicines/MedicineTable";

function Medicines() {

    const [searchTerm, setSearchTerm] = useState("");

    return (

        <DashboardLayout>

            <MedicineHeader />

            <MedicineSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <MedicineTable
                searchTerm={searchTerm}
            />

        </DashboardLayout>

    );

}

export default Medicines;
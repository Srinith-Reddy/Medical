import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PatientHeader from "../../components/patient/PatientHeader";
import PatientSearch from "../../components/patient/PatientSearch";
import PatientTable from "../../components/patient/PatientTable";

function Patients() {

    const [searchTerm, setSearchTerm] = useState("");

    return (

        <DashboardLayout>

            <PatientHeader />

            <PatientSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <PatientTable
                searchTerm={searchTerm}
            />

        </DashboardLayout>

    );

}

export default Patients;
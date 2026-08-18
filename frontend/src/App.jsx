import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import OrganizationDashboard from "./pages/dashboard/OrganizationDashboard";
import OrganizationDetails from "./pages/organization/OrganizationDetails";
import Organizations from "./pages/organization/Organizations";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import LabDashboard from "./pages/dashboard/LabDashboard";

import Patients from "./pages/patients/Patients";
import AddPatient from "./pages/patients/AddPatient";
import EditPatient from "./pages/patients/EditPatient";
import PatientProfile from "./pages/patients/PatientProfile";

import Records from "./pages/medicalrecords/Records";
import UploadRecord from "./pages/medicalrecords/UploadRecord";
import RecordDetails from "./pages/medicalrecords/RecordDetails";

import Medicines from "./pages/medicines/Medicines";
import AddMedicine from "./pages/medicines/AddMedicine";
import MedicineDetails from "./pages/medicines/MedicineDetails";

import Prescriptions from "./pages/prescriptions/Prescriptions";
import AddPrescription from "./pages/prescriptions/AddPrescription";
import PrescriptionDetails from "./pages/prescriptions/PrescriptionDetails";

import BookAppointment from "./pages/appointments/BookAppointment";
import DoctorAppointments from "./pages/appointments/DoctorAppointments";
import DoctorAppointment from "./pages/appointments/DoctorAppointment";

import OrganizationDoctors from "./pages/organization/OrganizationDoctors";
import OrganizationAppointments from "./pages/organization/OrganizationAppointments";
import OrganizationPatients from "./pages/organization/OrganizationPatients";
import OrganizationPatientDetails from "./pages/organization/OrganizationPatientDetails";
import OrganizationLabs from "./pages/organization/OrganizationLabs";

import DoctorSettings from "./pages/settings/DoctorSettings";
import OrganizationSettings from "./pages/settings/OrganizationSettings";
import PatientSettings from "./pages/settings/PatientSettings";


function App() {

    return (

        <Routes>

            {/* Redirect */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/patient"
                        replace
                    />
                }
            />


            {/* -------------------------------------------------- */}
            {/* DASHBOARDS */}
            {/* -------------------------------------------------- */}

            <Route
                path="/patient"
                element={<Dashboard />}
            />

            <Route
                path="/doctor"
                element={<DoctorDashboard />}
            />

            <Route
                path="/lab"
                element={<LabDashboard />}
            />


            {/* -------------------------------------------------- */}
            {/* APPOINTMENTS */}
            {/* -------------------------------------------------- */}

            {/* Doctor appointments */}

            <Route
                path="/appointments"
                element={<DoctorAppointments />}
            />


            {/* Doctor consultation */}

            <Route
                path="/doctor/appointments/:appointmentId"
                element={<DoctorAppointment />}
            />


            {/* Patient booking */}

            <Route
                path="/appointments/book"
                element={<BookAppointment />}
            />


            {/* Organization appointments */}

            <Route
                path="/organization/appointments"
                element={<OrganizationAppointments />}
            />


            {/* -------------------------------------------------- */}
            {/* ORGANIZATION */}
            {/* -------------------------------------------------- */}

            <Route
                path="/organization"
                element={<OrganizationDashboard />}
            />

            <Route
                path="/organization/:id"
                element={<OrganizationDetails />}
            />

            <Route
                path="/organizations"
                element={<Organizations />}
            />


            {/* Organization doctors */}

            <Route
                path="/organization/doctors"
                element={<OrganizationDoctors />}
            />


            {/* Organization labs */}

            <Route
                path="/organization/labs"
                element={<OrganizationLabs />}
            />


            {/* Organization patients */}

            <Route
                path="/organization/:id/patients"
                element={<OrganizationPatients />}
            />

            <Route
                path="/organization/:id/patients/:patientId"
                element={<OrganizationPatientDetails />}
            />


            {/* -------------------------------------------------- */}
            {/* PATIENTS */}
            {/* -------------------------------------------------- */}

            <Route
                path="/patients"
                element={<Patients />}
            />

            <Route
                path="/patients/add"
                element={<AddPatient />}
            />

            <Route
                path="/patients/edit/:id"
                element={<EditPatient />}
            />

            <Route
                path="/patients/:id"
                element={<PatientProfile />}
            />


            {/* -------------------------------------------------- */}
            {/* MEDICAL RECORDS */}
            {/* -------------------------------------------------- */}

            <Route
                path="/records"
                element={<Records />}
            />

            <Route
                path="/records/upload"
                element={<UploadRecord />}
            />

            <Route
                path="/records/:id"
                element={<RecordDetails />}
            />


            {/* -------------------------------------------------- */}
            {/* MEDICINES */}
            {/* -------------------------------------------------- */}

            <Route
                path="/medicines"
                element={<Medicines />}
            />

            <Route
                path="/medicines/add"
                element={<AddMedicine />}
            />

            <Route
                path="/medicines/:id"
                element={<MedicineDetails />}
            />


            {/* -------------------------------------------------- */}
            {/* PRESCRIPTIONS */}
            {/* -------------------------------------------------- */}

            <Route
                path="/prescriptions"
                element={<Prescriptions />}
            />

            <Route
                path="/add-prescription"
                element={<AddPrescription />}
            />

            <Route
                path="/prescriptions/:id"
                element={<PrescriptionDetails />}
            />

            {/* -------------------------------------------------- */}
            {/* SETTINGS */}
            {/* -------------------------------------------------- */}

            {/* Patient Settings */}

            <Route
                path="/patient/settings"
                element={<PatientSettings />}
            />


            {/* Doctor Settings */}

            <Route
                path="/doctor/settings"
                element={<DoctorSettings />}
            />


            {/* Organization Settings */}

            <Route
                path="/organization/settings"
                element={<OrganizationSettings />}
            />

        </Routes>

    );

}


export default App;
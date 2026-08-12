import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import OrganizationDashboard from "./pages/dashboard/OrganizationDashboard";
import OrganizationDetails from "./pages/organization/OrganizationDetails";
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

function App() {
    return (
        <Routes>

            {/* Redirect */}
            <Route
                path="/"
                element={<Navigate to="/patient" replace />}
            />

            {/* Dashboards */}
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

            <Route
                path="/organization"
                element={<OrganizationDashboard />}
            />

            <Route
                path="/organization/:id"
                element={<OrganizationDetails />}
            />

            {/* Patients */}
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

            {/* Medical Records */}
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

            <Route path="/prescriptions" element={<Prescriptions />} />

            <Route path="/add-prescription" element={<AddPrescription />} />

            <Route
              path="/prescriptions/:id"
              element={<PrescriptionDetails />}
            />

            <Route path="/appointments/book" element={<BookAppointment />} />

        </Routes>
    );
}

export default App;
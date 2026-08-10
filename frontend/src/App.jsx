import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import OrganizationDetails from "./pages/organization/OrganizationDetails";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import LabDashboard from "./pages/dashboard/LabDashboard";
import Patients from "./pages/patients/Patients";
import AddPatient from "./pages/patients/AddPatient";
import PatientDetails from "./pages/patients/PatientDetails";
import EditPatient from "./pages/patients/EditPatient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/patient" replace />} />

      <Route
        path="/patient"
        element={<Dashboard />}
      />

      <Route
        path="/organization"
        element={<OrganizationDashboard />}
      />

      <Route
        path="/organization/:id"
        element={<OrganizationDetails />}
      />

      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/lab" element={<LabDashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/add" element={<AddPatient />} />
      <Route
        path="/patients/:id"
        element={<PatientDetails />}
      />
      <Route
        path="/patients/edit/:id"
        element={<EditPatient />}
      />


    </Routes>
  );
}

export default App;
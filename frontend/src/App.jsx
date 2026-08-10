import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import OrganizationDetails from "./pages/organization/OrganizationDetails";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import LabDashboard from "./pages/dashboard/LabDashboard";

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


    </Routes>
  );
}

export default App;
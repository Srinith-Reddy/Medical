import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import OrganizationDetails from "./pages/organization/OrganizationDetails";

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

      
    </Routes>
  );
}

export default App;
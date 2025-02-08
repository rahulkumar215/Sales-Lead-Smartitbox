import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ItemsPage from "./components/items/ItemsPage";
import QuotationPage from "./components/quotation/QuotationPage";
import Login from "./components/login/Login";
import UserPage from "./components/user/UserPage";
import CompanyPage from "./components/company/CompanyPage";
import Layout from "./components/layout/Layout";
import LeadsPage from "./components/leads/LeadsPage";
import PrivateRoute from "./PrivateRoute";
import ProformaInvoice from "./components/proforma invoice/ProformaInvoice";
import LeadsDashboard from "./components/dashboard/LeadsDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Route for Login */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Routes with Layout */}
          <Route element={<Layout />}>
            {/* Restricted Routes */}
            <Route
              path="/items"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <ItemsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <UserPage />
                </PrivateRoute>
              }
            />

            {/* Routes accessible to all */}
            <Route
              path="/leads"
              element={
                <PrivateRoute allowedRoles={["admin", "sales executive"]}>
                  <LeadsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/proforma-invoice"
              element={
                <PrivateRoute allowedRoles={["admin", "accounts"]}>
                  <ProformaInvoice />
                </PrivateRoute>
              }
            />
            <Route
              path="/quote"
              element={
                <PrivateRoute allowedRoles={["admin", "sales executive"]}>
                  <QuotationPage />
                </PrivateRoute>
              }
            />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/dashboard" element={<LeadsDashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

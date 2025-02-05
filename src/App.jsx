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
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/quote" element={<QuotationPage />} />
            <Route path="/company" element={<CompanyPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

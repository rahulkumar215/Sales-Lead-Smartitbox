import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ItemsPage from "./components/items/ItemsPage";
import QuotationPage from "./components/quotation/QuotationPage";
import Login from "./components/login/Login";
import UserPage from "./components/user/UserPage";
import CompanyPage from "./components/company/CompanyPage";
import Layout from "./components/layout/Layout";
import LeadsPage from "./components/leads/LeadsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Route for Login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/home" element={<QuotationPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/company" element={<CompanyPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

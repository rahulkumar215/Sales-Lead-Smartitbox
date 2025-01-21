import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CompanyForm from "./CompanyForm";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    industryType: "",
    contactPerson: "",
    number: "",
    emailID: "",
    designation: "",
    designationType: "",
    department: "",
  });

  const generateUID = () => `company-${Math.floor(Math.random() * 1000000)}`;

  const handleAddCompany = () => {
    // Validate that all fields are filled
    if (Object.values(newCompany).some((field) => field.trim() === "")) {
      toast.error("Please fill out all fields.");
      return;
    }

    const newCompanyWithUID = { ...newCompany, uid: generateUID() };
    setCompanies([...companies, newCompanyWithUID]);
    toast.success("Company added successfully!");
    setNewCompany({
      companyName: "",
      address: "",
      country: "",
      state: "",
      city: "",
      industryType: "",
      contactPerson: "",
      number: "",
      emailID: "",
      designation: "",
      designationType: "",
      department: "",
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDeleteCompany = (uid) => {
    setCompanies(companies.filter((company) => company.uid !== uid));
    toast.error("Company deleted successfully!");
  };

  const handleEditCompany = (uid) => {
    const companyToEdit = companies.find((company) => company.uid === uid);
    setNewCompany(companyToEdit);
    setIsModalOpen(true);
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchQuery) ||
      company.emailID.toLowerCase().includes(searchQuery)
  );

  const companiesPerPage = 5;
  const pageCount = Math.ceil(filteredCompanies.length / companiesPerPage);
  const displayCompanies = filteredCompanies.slice(
    pageNumber * companiesPerPage,
    (pageNumber + 1) * companiesPerPage
  );

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-300 p-6">
      <ToastContainer />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search companies"
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          Add Company
        </button>
      </div>

      {/* Company Form (Modal-like) */}
      {isModalOpen && <CompanyForm />}

      {/* Company Table */}
      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {[
                "Company Name",
                "Address",
                "Country",
                "State",
                "City",
                "Industry Type",
                "Contact Person",
                "Number",
                "Email ID",
                "Designation",
                "Designation Type",
                "Department",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-medium text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayCompanies.length === 0 ? (
              <tr>
                <td
                  colSpan="14"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No companies found
                </td>
              </tr>
            ) : (
              displayCompanies.map((company) => (
                <tr key={company.uid} className="hover:bg-gray-50">
                  {[
                    "uid",
                    "companyName",
                    "address",
                    "country",
                    "state",
                    "city",
                    "industryType",
                    "contactPerson",
                    "number",
                    "emailID",
                    "designation",
                    "designationType",
                    "department",
                  ].map((field) => (
                    <td key={field} className="px-6 py-4 text-sm">
                      {company[field]}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => handleEditCompany(company.uid)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteCompany(company.uid)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          {filteredCompanies.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          previousLabel="Prev"
          nextLabel="Next"
          activeClassName="bg-indigo-600 text-white px-2 rounded-md"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default CompanyPage;

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import CompanyForm from "./CompanyForm";
import ShortUniqueId from "short-unique-id";
import EditCompanyForm from "./EditCompanyForm";

const CompanyPage = () => {
  const { randomUUID } = new ShortUniqueId({ length: 4 });

  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [editCompany, setEditCompany] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const handleAddCompany = (companies) => {
    // Validate that all fields are filled
    const newCompanies = companies.map((comp) => {
      return {
        uid: randomUUID(),
        ...comp,
      };
    });
    setCompanies((prev) => [...prev, ...newCompanies]);
    toast.success("Customer added successfully!");
    setIsModalOpen(false);
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
    setEditCompany(companyToEdit);
    setIsEditModalOpen(true);
  };

  const saveEditedCompany = (data) => {
    setCompanies((prev) =>
      prev.map((comp) => (comp.uid === data.uid ? data : comp))
    );
    setIsEditModalOpen(false);
    toast.success("Customer updated successfully!");
  };

  const filteredCompanies = companies.filter((company) =>
    Object.values(company).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const companiesPerPage = 15;
  const pageCount = Math.ceil(filteredCompanies.length / companiesPerPage);
  const displayCompanies = filteredCompanies.slice(
    pageNumber * companiesPerPage,
    (pageNumber + 1) * companiesPerPage
  );

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <ToastContainer />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search companies"
          onChange={handleSearch}
          className="p-1 border border-gray-300 bg-gray-100 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-black"
        />
        <button
          className="px-6 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus />
          Add Company
        </button>
      </div>

      {/* Company Form (Modal-like) */}
      {isModalOpen && (
        <CompanyForm
          onAddCompany={handleAddCompany}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditCompanyForm
          companyData={editCompany}
          onEditCompany={saveEditedCompany}
          onClose={() => {
            setEditCompany("");
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* Company Table */}
      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-blue-900 text-white">
            <tr>
              {[
                "Company Name",
                "Address",
                "GST",
                "Country",
                "State",
                "City",
                "Industry Type",
                "Contact Person",
                "Number",
                "Email ID",
                "Designation",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-1 text-left font-medium text-sm"
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
                    "companyName",
                    "address",
                    "gst",
                    "country",
                    "state",
                    "city",
                    "industryType",
                    "contactPerson",
                    "number",
                    "email",
                    "designation",
                  ].map((field) => (
                    <td key={field} className="px-3 py-2 text-sm">
                      {company[field]}
                    </td>
                  ))}
                  <td className="px-3 py-2 flex gap-4">
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
        <p className="text-sm text-gray-800 font-semibold">
          {filteredCompanies.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          previousLabel={
            <span className="px-2 py-1 bg-gray-200 text-gray-600  rounded-sm hover:bg-gray-300 transition-all">
              Prev
            </span>
          }
          nextLabel={
            <span className="px-2 py-1 bg-gray-200 text-gray-600  rounded-sm hover:bg-gray-300 transition-all">
              Next
            </span>
          }
          activeClassName="bg-indigo-600 text-white font-semibold px-2 rounded-sm transition-all"
          disabledClassName="text-gray-400 cursor-not-allowed"
          pageClassName="px-2 rounded-sm text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all"
          breakClassName="text-gray-600"
        />
      </div>
    </div>
  );
};

export default CompanyPage;

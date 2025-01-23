import { useState } from "react";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import LeadsForm from "./LeadsForm";
import PopOver from "./PopOver";
import { IoMail } from "react-icons/io5";

function LeadsPage() {
  const [leads, setLeads] = useState([
    {
      id: "LD-001",
      timestamp: "2025-01-22 10:00 AM",
      leadType: "NBD",
      companyName: "ABC Corp",
      address: "123, Street Name, City",
      country: "Country 1",
      state: "State 1",
      city: "City 1",
      leadSource: "Referral",
      industryType: "IT",
      contactPerson: "John Doe",
      number: "1234567890",
      emailId: "john.doe@example.com",
      designation: "Manager",
      designationType: "Full-Time",
      department: "Sales",
      enquiryType: "Product Inquiry",
      actionTaken: "Followed up",
      leadAssignedTo: "Agent 1",
      remarks: "Urgent follow-up needed",
      furtherAction: "Call back in 2 days",
      followupDate: "2025-01-24",
      leadPunchedBy: "Admin",
      geoLocation: "Latitude: 40.7128, Longitude: 74.0060",
      status: "Pending",
    },
    {
      id: "LD-002",
      timestamp: "2025-01-22 11:00 AM",
      leadType: "CRR",
      companyName: "XYZ Ltd",
      address: "456, Avenue Name, City",
      country: "Country 2",
      state: "State 2",
      city: "City 2",
      leadSource: "Web",
      industryType: "Healthcare",
      contactPerson: "Jane Smith",
      number: "2345678901",
      emailId: "jane.smith@example.com",
      designation: "Director",
      designationType: "Part-Time",
      department: "HR",
      enquiryType: "Service Inquiry",
      actionTaken: "Initial contact made",
      leadAssignedTo: "Agent 2",
      remarks: "Awaiting response",
      furtherAction: "Send email follow-up",
      followupDate: "2025-01-25",
      leadPunchedBy: "Admin",
      geoLocation: "Latitude: 34.0522, Longitude: 118.2437",
      status: "Active",
    },
    {
      id: "LD-003",
      timestamp: "2025-01-22 12:00 PM",
      leadType: "CRR",
      companyName: "LMN Inc.",
      address: "789, Road Name, City",
      country: "Country 3",
      state: "State 3",
      city: "City 3",
      leadSource: "Ad Campaign",
      industryType: "Retail",
      contactPerson: "James Brown",
      number: "3456789012",
      emailId: "james.brown@example.com",
      designation: "CEO",
      designationType: "Full-Time",
      department: "Marketing",
      enquiryType: "Product Inquiry",
      actionTaken: "No response yet",
      leadAssignedTo: "Agent 3",
      remarks: "May convert into a lead",
      furtherAction: "Check again next week",
      followupDate: "2025-01-30",
      leadPunchedBy: "Admin",
      geoLocation: "Latitude: 51.5074, Longitude: 0.1278",
      status: "Inactive",
    },
    // Add more leads as needed
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add state and logic for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust this as needed

  const filteredLeads = leads.filter((lead) =>
    Object.values(lead)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  // Slice the items based on the current page
  const paginatedLeads = filteredLeads.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Calculate the page count
  const pageCount = Math.ceil(filteredLeads.length / itemsPerPage);

  const handleDelete = (index) => {
    const updatedLeads = leads.filter((_, i) => i !== index);
    setLeads(updatedLeads);
    toast.error("Lead deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-200 p-3">
      <ToastContainer />

      {/* Modal Implementation */}
      {isModalOpen && (
        <LeadsForm closeModal={() => setIsModalOpen(false)} onLeadSave="" />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 flex items-center gap-2 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
        >
          <FaPlus /> Add Lead
        </button>
      </div>

      {/* Table Section */}
      <div
        className="overflow-x-auto bg-white shadow-lg max-w-[100vw] rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto overflow-x-auto">
          <thead
            className="bg-gray-100 text-gray-600"
            style={{ fontFamily: "Open Sans, serif", fontSize: "13px" }}
          >
            <tr>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Actions
              </th>
              <th className="px-9 py-3 text-left font-medium text-sm">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Lead ID
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Lead Type
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Company Name
              </th>
              <th className="px-2 py-3 text-left font-medium text-sm">
                Address
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Country
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">State</th>
              <th className="px-6 py-3 text-left font-medium text-sm">City</th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Lead Source
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Industry Type
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Contact Person
              </th>
              <th className="px-2 py-3 text-left font-medium text-sm">
                Number
              </th>
              <th className="px-2 py-3 text-left font-medium text-sm">
                Email ID
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Desigsnation
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Designation Type
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Department
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Enquiry Type
              </th>
              {/* <th className="px-6 py-3 text-left font-medium text-sm">
                Action Taken
              </th> */}
              <th className="px-6 py-3 text-left font-medium text-sm">
                Lead Assigned to
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Remarks
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Further Action
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Followup Date
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Lead Punched By
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.length === 0 ? (
              <tr>
                <td
                  colSpan="25"
                  className="px-6 w-full py-4 text-center text-gray-500"
                >
                  No leads found
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border border-t-gray-300"
                >
                  <td className="  text-center">
                    <button
                      onClick={() =>
                        alert("Edit functionality not implemented yet")
                      }
                      className="text-indigo-600 mr-2 hover:text-indigo-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                  <td>{lead.timestamp}</td>
                  <td className="text-red-800 font-bold  ">{lead.id}</td>
                  <td
                    className={`${
                      lead.leadType === "NBD" ? "bg-red-200" : "bg-green-200"
                    }`}
                  >
                    {lead.leadType}
                  </td>
                  <td>{lead.companyName}</td>
                  <PopOver value={lead.address}>
                    <FaMapMarkerAlt size={20} className="text-blue-700" />
                  </PopOver>
                  <td>{lead.country}</td>
                  <td>{lead.state}</td>
                  <td>{lead.city}</td>
                  <td>{lead.leadSource}</td>
                  <td>{lead.industryType}</td>
                  <td>{lead.contactPerson}</td>
                  <PopOver value={lead.number}>
                    <FaPhoneAlt size={20} className="text-green-700" />
                  </PopOver>
                  <PopOver value={lead.emailId}>
                    <IoMail size={20} className="text-red-700" />
                  </PopOver>
                  <td>{lead.designation}</td>
                  <td>{lead.designationType}</td>
                  <td>{lead.department}</td>
                  <td>{lead.enquiryType}</td>
                  {/* <td>{lead.actionTaken}</td> */}
                  <td>{lead.leadAssignedTo}</td>
                  <td>{lead.remarks}</td>
                  <td>{lead.furtherAction}</td>
                  <td>{lead.followupDate}</td>
                  <td>{lead.leadPunchedBy}</td>
                  <td>{lead.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-800 font-semibold">
          {filteredLeads.length} entries found
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
}

export default LeadsPage;

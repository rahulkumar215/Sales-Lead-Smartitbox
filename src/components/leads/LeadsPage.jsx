import React, { useRef, useState } from "react";
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

const dummyLeads = [
  {
    leadDetails: {
      name: "Company A",
      id: 1,
      address: "r z c-56",
      countryCode: "IN",
      country: "India",
      stateCode: "DL",
      state: "Delhi",
      city: "New Delhi",
      leadSource: "IndiaMart",
      industryType: "Chemicals",
      contactPerson: "Rahul",
      number: "9319444628",
      email: "rk83029014@gmail.com",
      designation: "MD",
      enquiryType: "Hot",
      timestamp: "24/01/2025, 4:31 pm",
      assignedTo: "Rahul",
      leadType: "CRR",
      puchedBy: "Kashif",
      status: "Pending",
      leadId: "L-001",
    },
    itemDetails: [
      {
        category: "Electronics",
        name: "Phone",
        qty: "1",
        price: "12",
        total: 12,
      },
    ],
  },
  {
    leadDetails: {
      name: "Company A",
      id: 1,
      address: "r z c-56",
      countryCode: "IN",
      country: "India",
      stateCode: "DL",
      state: "Delhi",
      city: "New Delhi",
      leadSource: "IndiaMart",
      industryType: "Chemicals",
      contactPerson: "Rahul",
      number: "9319444628",
      email: "rk83029014@gmail.com",
      designation: "MD",
      enquiryType: "Hot",
      timestamp: "24/01/2025, 4:37 pm",
      assignedTo: "Rahul",
      leadType: "CRR",
      puchedBy: "Kashif",
      status: "Pending",
      leadId: "L-002",
    },
    itemDetails: [
      {
        category: "Furniture",
        name: "Chair",
        qty: "1",
        price: "100",
        total: 100,
      },
      {
        category: "Furniture",
        name: "Table",
        qty: "2",
        price: "200",
        total: 400,
      },
      {
        category: "Electronics",
        name: "Tablet",
        qty: "3",
        price: "300",
        total: 900,
      },
      {
        category: "Stationery",
        name: "Pen",
        qty: "4",
        price: "400",
        total: 1600,
      },
      {
        category: "Furniture",
        name: "Chair",
        qty: "5",
        price: "500",
        total: 2500,
      },
    ],
  },
  {
    leadDetails: {
      name: "Company B",
      id: 2,
      address: "45-B, Industrial Area",
      countryCode: "US",
      country: "United States",
      stateCode: "CA",
      state: "California",
      city: "Los Angeles",
      leadSource: "LinkedIn",
      industryType: "Technology",
      contactPerson: "Alice Johnson",
      number: "9876543210",
      email: "alice.j@example.com",
      designation: "CEO",
      enquiryType: "Warm",
      timestamp: "24/01/2025, 5:00 pm",
      assignedTo: "John",
      leadType: "New",
      puchedBy: "Emily",
      status: "Follow-Up",
      leadId: "L-003",
    },
    itemDetails: [
      {
        category: "Software",
        name: "CRM Tool",
        qty: "1",
        price: "500",
        total: 500,
      },
      {
        category: "Services",
        name: "Consulting",
        qty: "1",
        price: "1500",
        total: 1500,
      },
    ],
  },
  {
    leadDetails: {
      name: "Company C",
      id: 3,
      address: "12 Park Avenue",
      countryCode: "AU",
      country: "Australia",
      stateCode: "NSW",
      state: "New South Wales",
      city: "Sydney",
      leadSource: "Google Ads",
      industryType: "Healthcare",
      contactPerson: "Michael Green",
      number: "9123456789",
      email: "michael.g@example.com",
      designation: "Manager",
      enquiryType: "Cold",
      timestamp: "24/01/2025, 5:15 pm",
      assignedTo: "Sophia",
      leadType: "Potential",
      puchedBy: "Mark",
      status: "Pending",
      leadId: "L-004",
    },
    itemDetails: [
      {
        category: "Medical Supplies",
        name: "Surgical Gloves",
        qty: "50",
        price: "5",
        total: 250,
      },
      {
        category: "Medical Supplies",
        name: "Face Masks",
        qty: "100",
        price: "2",
        total: 200,
      },
      {
        category: "Medical Equipment",
        name: "ECG Machine",
        qty: "1",
        price: "1500",
        total: 1500,
      },
    ],
  },
  {
    leadDetails: {
      name: "Company D",
      id: 4,
      address: "88 Main Street",
      countryCode: "UK",
      country: "United Kingdom",
      stateCode: "LND",
      state: "London",
      city: "London",
      leadSource: "Facebook",
      industryType: "Retail",
      contactPerson: "Emma Brown",
      number: "8754693210",
      email: "emma.b@example.com",
      designation: "Director",
      enquiryType: "Hot",
      timestamp: "24/01/2025, 5:45 pm",
      assignedTo: "Liam",
      leadType: "CRR",
      puchedBy: "Noah",
      status: "Converted",
      leadId: "L-005",
    },
    itemDetails: [
      {
        category: "Apparel",
        name: "T-Shirt",
        qty: "20",
        price: "10",
        total: 200,
      },
      {
        category: "Apparel",
        name: "Jeans",
        qty: "15",
        price: "25",
        total: 375,
      },
      {
        category: "Accessories",
        name: "Belts",
        qty: "30",
        price: "5",
        total: 150,
      },
    ],
  },
];

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [items, setItems] = useState([]);
  const [combLeadDetails, setCombLeadDetails] = useState(dummyLeads);
  const [leadToEdit, setLeadToEdit] = useState("");
  const [newLeadId, setNewLeadId] = useState(
    `L-00${combLeadDetails.length + 1}`
  );
  const [expandedRow, setExpandedRow] = useState(null);
  const contentRefs = useRef([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add state and logic for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust this as needed

  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const filteredLeads = combLeadDetails.filter((lead) =>
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

  const handleDelete = (e, leadId) => {
    e.stopPropagation();
    const updatedLeads = combLeadDetails.filter(
      (i) => i.leadDetails.leadId !== leadId
    );
    setCombLeadDetails(updatedLeads);
    toast.error("Lead deleted successfully!");
  };

  const handleAddLead = (lead, items) => {
    // Find the lead by its unique identifier (e.g., leadId)
    const existingLeadIndex = combLeadDetails.findIndex(
      (entry) => entry.leadDetails.leadId === lead.leadId
    );

    if (existingLeadIndex !== -1) {
      // Lead exists: update its details
      const updatedLeads = [...combLeadDetails];
      updatedLeads[existingLeadIndex] = {
        leadDetails: { ...lead }, // Update lead details
        itemDetails: items, // Update item details
      };
      setCombLeadDetails(updatedLeads);
    } else {
      // Lead does not exist: add it as a new entry
      const newLeadEntry = {
        leadDetails: { ...lead, leadId: newLeadId }, // Assign new leadId
        itemDetails: items,
      };
      setCombLeadDetails((prev) => [...prev, newLeadEntry]);
      setNewLeadId(`L-00${combLeadDetails.length + 1}`);
    }
  };

  // const handleAddLead = (lead, items) => {
  //   // console.log(lead, items);
  //   // setLeads((prev) => [...prev, lead]);
  //   // setItems((prev) => [...prev, items]);
  //   // console.log({
  //   //   leadDetails: { ...lead, leadId: newLeadId },
  //   //   itemDetails: items,
  //   // });

  //   const allLeads = combLeadDetails;
  //   allLeads.push({
  //     leadDetails: { ...lead, leadId: newLeadId },
  //     itemDetails: items,
  //   });
  //   setNewLeadId(`L-00${allLeads.length + 1}`);
  //   setCombLeadDetails(allLeads);
  // };

  const handleEditLead = (e, leadId) => {
    e.stopPropagation();
    setLeadToEdit(
      combLeadDetails.find((lead) => lead.leadDetails.leadId === leadId)
    );
    setIsModalOpen(true);
    setNewLeadId(leadId);
  };

  return (
    <div className="min-h-screen p-3">
      <ToastContainer />

      {/* Modal Implementation */}
      {isModalOpen && (
        <LeadsForm
          leadId={newLeadId}
          closeModal={() => setIsModalOpen(false)}
          onLeadSave={handleAddLead}
          data={leadToEdit}
        />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search by anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 border border-gray-300 bg-gray-100 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-black"
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
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr className="bg-blue-900 text-white">
              <th className="px-6 text-left font-medium text-sm">Actions</th>
              <th className="px-12 text-left font-medium text-sm">Timestamp</th>
              <th className="px-6 text-left font-medium text-sm">Lead ID</th>
              <th className="px-6 text-left font-medium text-sm">Company</th>
              <th className="px-6 text-left font-medium text-sm">Source</th>
              <th className="px-6 text-left font-medium text-sm">
                Contact Person
              </th>
              <th className="px-6 text-left font-medium text-sm">Phone</th>
              <th className="px-6 text-left font-medium text-sm">Email</th>
              <th className="px-6 text-left font-medium text-sm">
                Designation
              </th>
              <th className="px-6 text-left font-medium text-sm">Type</th>
              <th className="px-6 text-left font-medium text-sm">
                Assigned to
              </th>
              <th className="px-6 text-left font-medium text-sm">Remarks</th>
              <th className="px-6 text-left font-medium text-sm">
                Followup Date
              </th>
              <th className="px-6 text-left font-medium text-sm">Punched By</th>
              <th className="px-6 text-left font-medium text-sm">Status</th>
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
                <React.Fragment key={index}>
                  <tr
                    onClick={() => toggleExpandRow(index)}
                    className={`hover:bg-gray-50 cursor-pointer transition-all duration-300 ease-in-out  ${
                      expandedRow === index
                        ? "bg-gray-300 hover:!bg-gray-400"
                        : ""
                    }`}
                  >
                    <td className="text-center">
                      <button
                        onClick={(e) =>
                          handleEditLead(e, lead.leadDetails.leadId)
                        }
                        className="text-indigo-600 mr-2 hover:text-indigo-800"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={(e) =>
                          handleDelete(e, lead.leadDetails.leadId)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                    <td className="py-2">{lead.leadDetails.timestamp}</td>
                    <td className="text-red-800 font-bold">
                      {lead.leadDetails.leadId}
                    </td>
                    <td>{lead.leadDetails.name}</td>
                    <td>{lead.leadDetails.leadSource}</td>
                    <td>{lead.leadDetails.contactPerson}</td>
                    <PopOver
                      value={lead.leadDetails.number}
                      link={`tel:${lead.leadDetails.number}`}
                    >
                      <FaPhoneAlt size={20} className="text-green-700" />
                    </PopOver>
                    <PopOver
                      value={lead.leadDetails.email}
                      link={`mailto:${lead.leadDetails.email}`}
                    >
                      <IoMail size={20} className="text-red-700" />
                    </PopOver>
                    <td>{lead.leadDetails.designation}</td>
                    <td>{lead.leadDetails.enquiryType}</td>
                    <td>{lead.leadDetails.assignedTo}</td>
                    <td>{lead.leadDetails.remarks}</td>
                    <td>{lead.leadDetails.followupDate}</td>
                    <td>{lead.leadDetails.punchedBy}</td>
                    <td>{lead.leadDetails.status}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">
                      <div
                        ref={(el) => (contentRefs.current[index] = el)}
                        className={`overflow-hidden overflow-x-auto transition-[max-height] duration-500 ease-in-out ${
                          expandedRow === index ? "max-h-screen" : "max-h-0"
                        }`}
                        style={{
                          maxHeight:
                            expandedRow === index
                              ? contentRefs.current[index]?.scrollHeight + "px"
                              : "0px",
                        }}
                      >
                        <div className="p-4 bg-slate-200 shadow-md rounded-lg flex">
                          {/* Lead Details Section */}
                          <div className="w-3/12 pr-4">
                            <h3 className="text-lg text-indigo-700 font-semibold mb-3">
                              Lead Details
                            </h3>
                            <div className="grid grid-cols-1 gap-2 text-sm">
                              <p>
                                <strong>Address:</strong>{" "}
                                {lead.leadDetails.address}
                              </p>
                              <p>
                                <strong>Country:</strong>{" "}
                                {lead.leadDetails.country}
                              </p>
                              <p>
                                <strong>State:</strong> {lead.leadDetails.state}
                              </p>
                              <p>
                                <strong>City:</strong> {lead.leadDetails.city}
                              </p>
                              <p>
                                <strong>Industry Type:</strong>{" "}
                                {lead.leadDetails.industryType}
                              </p>
                            </div>
                          </div>

                          {/* Item Details Section */}
                          <div className="w-9/12">
                            <h4 className="text-lg text-indigo-600 font-medium mb-3">
                              Item Details
                            </h4>
                            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
                              <thead className="bg-blue-200">
                                <tr>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Category
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Name
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Quantity
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Price
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {lead.itemDetails.map((item, i) => (
                                  <tr
                                    key={i}
                                    className={
                                      i % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    }
                                  >
                                    <td className="px-2 py-1 border border-gray-300 text-sm">
                                      {item.category}
                                    </td>
                                    <td className="px-2 py-1 border border-gray-300 text-sm">
                                      {item.name}
                                    </td>
                                    <td className="px-2 py-1 border border-gray-300 text-sm">
                                      {parseFloat(item.qty).toFixed(2)}
                                    </td>
                                    <td className="px-2 py-1 border border-gray-300 text-sm">
                                      ₹{parseFloat(item.price).toFixed(2)}
                                    </td>
                                    <td className="px-2 py-1 border border-gray-300 text-sm">
                                      ₹{parseFloat(item.total).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr className="bg-blue-100 !border-none text-red-700 font-bold">
                                  <th
                                    colSpan="4"
                                    className="px-2 py-3 !border-none text-right  font-semibold"
                                  >
                                    Total Value:
                                  </th>
                                  <th className="px-2 py-1 !border-none text-left  font-semibold">
                                    ₹
                                    {lead.itemDetails
                                      .reduce(
                                        (sum, item) => sum + item.total,
                                        0
                                      )
                                      .toFixed(2)}
                                  </th>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
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

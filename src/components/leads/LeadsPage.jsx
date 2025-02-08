import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import LeadsForm from "./LeadsForm";
import TakeFollowUpForm from "./TakeFollowUpForm";
import FollowUpHistory from "./FollowUpHistory";
import LeadTable from "./LeadTable";
import LeadExpandableTable from "./LeadExpandableTable";

const userInfo = {
  uid: "UID-Infini8",
  name: "Rahul",
  mobile: "9319444628",
  email: "rk83029014@gmail.com",
  role: "admin",
  username: "Infini8",
  password: "415263",
};

const dummyLeads = [
  {
    leadDetails: {
      name: "Company A",
      id: 1,
      gst: "7WZCAO0239I7Z3",
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
      timestamp: "30/01/2025, 4:12 pm",
      assignedTo: "Rahul",
      leadType: "CRR",
      punchedBy: "Kashif",
      status: "Pending",
      leadId: "L-001",
      interState: false,
    },
    itemDetails: [
      {
        category: "Flex",
        name: "Flex item 2",
        id: "3",
        units: "Nos",
        qty: "10",
        rate: 53,
        discount: "20",
        gstSlab: "18",
      },
    ],
  },
];

function LeadsPage() {
  // const [leads, setLeads] = useState([]);
  // const [items, setItems] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [combLeadDetails, setCombLeadDetails] = useState([]);
  const [leadToEdit, setLeadToEdit] = useState("");
  const [newLeadId, setNewLeadId] = useState(
    `L-00${combLeadDetails.length + 1}`
  );
  const [expandedRow, setExpandedRow] = useState(null);
  const contentRefs = useRef([]);
  const [leadFollowUpHistory, setLeadFollowUpHistory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowUpHistoryModalOpen, setIsFollowUpHistoryModalOpen] =
    useState(false);
  const [isTakeFollowUpModalOpen, setIsTakeFollowUpModalOpen] = useState(false);
  // Add state and logic for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust this as needed

  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const filteredLeads = combLeadDetails.filter((lead) =>
    Object.values(lead.leadDetails)
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

  const handleTakeFollowUp = (data) => {
    setFollowUps((prev) => [...prev, data]);
  };

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
      console.log(updatedLeads);
      setCombLeadDetails(updatedLeads);
    } else {
      // Lead does not exist: add it as a new entry
      const newLeadEntry = {
        leadDetails: lead,
        itemDetails: items,
      };

      console.log(newLeadEntry);
      const newCombLeadDetails = [...combLeadDetails, newLeadEntry];

      setNewLeadId(`L-00${newCombLeadDetails.length + 1}`);
      setCombLeadDetails(newCombLeadDetails);
    }
    toast.success("Lead saved successfully!");
    setIsModalOpen(false);
  };

  const showFollowUpHistory = (leadId) => {
    setIsFollowUpHistoryModalOpen(true);
    setLeadFollowUpHistory(leadId);
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

  // reset the setLeadToEdit and setNewLeadId when lead is edited or modal is closed Todo
  const handleEditLead = (e, leadId) => {
    e.stopPropagation();
    setLeadToEdit(
      combLeadDetails.find((lead) => lead.leadDetails.leadId === leadId)
    );
    setIsModalOpen(true);
    setNewLeadId(leadId);
  };

  useEffect(() => {
    setCombLeadDetails(
      userInfo.role === "admin"
        ? dummyLeads
        : dummyLeads.filter(
            (lead) => lead.leadDetails.assignedToId === userInfo.uid
          )
    );
  }, []);

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

      {/* Take Follow Up Modal Implementation */}
      {isTakeFollowUpModalOpen && (
        <TakeFollowUpForm
          leadId={leadFollowUpHistory}
          closeModal={() => setIsTakeFollowUpModalOpen(false)}
          onSave={handleTakeFollowUp}
          isModalOpen={isTakeFollowUpModalOpen}
        />
      )}

      {/* Follow Up History Modal Implementation */}
      {isFollowUpHistoryModalOpen && (
        <FollowUpHistory
          data={followUps.filter(
            (followup) => followup.leadId == leadFollowUpHistory
          )}
          closeModal={() => setIsFollowUpHistoryModalOpen(false)}
        />
      )}

      {/* Search bar and Add Lead button Section */}
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
        className="overflow-x-auto bg-white shadow-lg max-w-[100vw] rounded-lg main-table"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr className="bg-blue-900 text-white">
              {[
                "Actions",
                "Timestamp",
                "Lead ID",
                "Type",
                "Company",
                "Source",
                "Contact Person",
                "Phone",
                "Email",
                "Designation",
                "Enquiry Type",
                "Assigned to",
                "Remarks",
                "Followup Date",
                "Punched By",
                "Status",
              ].map((header, index) => (
                <th
                  key={index}
                  className={`px-6 text-left font-medium text-sm ${
                    header === "Timestamp" ? "!px-12" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
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
                  <LeadTable
                    toggleExpandRow={toggleExpandRow}
                    index={index}
                    lead={lead}
                    expandedRow={expandedRow}
                    handleEditLead={handleEditLead}
                    handleDelete={handleDelete}
                    userInfo={userInfo}
                  />
                  <LeadExpandableTable
                    contentRefs={contentRefs}
                    index={index}
                    expandedRow={expandedRow}
                    lead={lead}
                    showFollowUpHistory={showFollowUpHistory}
                    setIsTakeFollowUpModalOpen={setIsTakeFollowUpModalOpen}
                    setLeadFollowUpHistory={setLeadFollowUpHistory}
                  />
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

import React, { useEffect, useRef, useState } from "react";
import {
  FaEdit,
  FaHistory,
  FaPhoneAlt,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import LeadsForm from "./LeadsForm";
import PopOver from "./PopOver";
import { IoMail } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import TakeFollowUpForm from "./TakeFollowUpForm";
import FollowUpHistory from "./FollowUpHistory";
import PivotTable from "./PivotTable";

const userInfo = {
  uid: "UID-Infini8",
  name: "Rahul",
  mobile: "9319444628",
  email: "rk83029014@gmail.com",
  designation: "sales",
  department: "admin",
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

  console.log(JSON.stringify(combLeadDetails));

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
      userInfo.department === "admin"
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

      {/* Take Follow Up Modal Implementation */}
      {isFollowUpHistoryModalOpen && (
        <FollowUpHistory
          data={followUps.filter(
            (followup) => followup.leadId == leadFollowUpHistory
          )}
          closeModal={() => setIsFollowUpHistoryModalOpen(false)}
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
        className="overflow-x-auto bg-white shadow-lg max-w-[100vw] rounded-lg main-table"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr className="bg-blue-900 text-white">
              <th className="px-6 text-left font-medium text-sm">Actions</th>
              <th className="px-12 text-left font-medium text-sm">Timestamp</th>
              <th className="px-6 text-left font-medium text-sm">Lead ID</th>
              <th className="px-6 text-left font-medium text-sm">Type</th>
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
              <th className="px-6 text-left font-medium text-sm">
                Enquriy Type
              </th>
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
                      {userInfo.department === "admin" && (
                        <button
                          onClick={(e) =>
                            handleDelete(e, lead.leadDetails.leadId)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      )}
                    </td>
                    <td className="py-2">{lead.leadDetails.timestamp}</td>
                    <td className="text-red-800 font-bold">
                      {lead.leadDetails.leadId}
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-md ${
                          lead.leadDetails.leadType === "NBD"
                            ? "bg-red-200 border border-red-400"
                            : "bg-green-200 border border-green-400"
                        }`}
                      >
                        {lead.leadDetails.leadType}
                      </span>
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
                    <td>
                      <span
                        className={`px-2 py-1 rounded-md ${
                          lead.leadDetails.enquiryType === "Hot" &&
                          "bg-red-200 border border-red-400"
                        } ${
                          lead.leadDetails.enquiryType === "Cold" &&
                          " bg-blue-200 border border-blue-400"
                        } ${
                          lead.leadDetails.enquiryType === "Warm" &&
                          "bg-yellow-200  border border-yellow-400"
                        }`}
                      >
                        {lead.leadDetails.enquiryType}
                      </span>
                    </td>
                    <td>{lead.leadDetails.assignedTo}</td>
                    <td>{lead.leadDetails.remarks}</td>
                    <td>{lead.leadDetails.followupDate}</td>
                    <td>{lead.leadDetails.punchedBy}</td>
                    <td>
                      <span
                        className={`px-1 py-0.5 rounded-md ${
                          lead.leadDetails.status === "Won"
                            ? "bg-green-200 border border-green-400"
                            : lead.leadDetails.status === "Lost"
                            ? "bg-red-200 border border-red-400"
                            : "bg-yellow-200 border border-yellow-400"
                        }`}
                      >
                        {lead.leadDetails.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="16">
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
                              <p>
                                <strong>GST No.:</strong> {lead.leadDetails.gst}
                              </p>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <button
                                  className="bg-teal-600 flex gap-2 justify-center items-center hover:bg-teal-700 py-2 px-4 rounded-md text-white "
                                  onClick={() =>
                                    showFollowUpHistory(lead.leadDetails.leadId)
                                  }
                                >
                                  <FaHistory size={20} />
                                  Follow Up History
                                </button>
                                <button
                                  className="bg-red-600 flex gap-2 justify-center items-center hover:bg-red-700 py-2 px-4 rounded-md text-white"
                                  onClick={() => {
                                    setIsTakeFollowUpModalOpen(true);
                                    setLeadFollowUpHistory(
                                      lead.leadDetails.leadId
                                    );
                                  }}
                                >
                                  <FaEdit size={20} />
                                  Take Follow Up
                                </button>
                              </div>
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
                                    Id
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Qty.
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Rate
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Subtotal
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Discount
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Taxable Amount
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    GST Slab
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    IGST
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    SGST
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    IGST
                                  </th>
                                  <th className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {lead.itemDetails.length === 0 ? (
                                  <tr className=" text-center">
                                    <td colSpan={16}>
                                      Items are not added for this lead.
                                    </td>
                                  </tr>
                                ) : (
                                  lead.itemDetails.map((item, i) => (
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
                                        {item.id}
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        {parseFloat(item.qty).toFixed(2)}
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        ₹{parseFloat(item.rate).toFixed(2)}
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        ₹
                                        {parseFloat(
                                          item.qty * item.rate
                                        ).toFixed(2)}
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        {item.discount}%
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        ₹
                                        {parseFloat(
                                          item.qty *
                                            item.rate *
                                            (1 - item.discount / 100)
                                        ).toFixed(2)}
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        {item.gstSlab}%
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        ₹
                                        {lead.leadDetails.interState
                                          ? parseFloat(
                                              item.qty *
                                                item.rate *
                                                (1 - item.discount / 100) *
                                                (item.gstSlab / 100)
                                            ).toFixed(2)
                                          : "0.00"}
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        ₹
                                        {lead.leadDetails.interState
                                          ? "0.00"
                                          : parseFloat(
                                              item.qty *
                                                item.rate *
                                                (1 - item.discount / 100) *
                                                (item.gstSlab / 200)
                                            ).toFixed(2)}
                                      </td>
                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        ₹
                                        {lead.leadDetails.interState
                                          ? "0.00"
                                          : parseFloat(
                                              item.qty *
                                                item.rate *
                                                (1 - item.discount / 100) *
                                                (item.gstSlab / 200)
                                            ).toFixed(2)}
                                      </td>

                                      <td className="px-2 py-1 border border-gray-300 text-sm">
                                        ₹
                                        {parseFloat(
                                          item.qty *
                                            item.rate *
                                            (1 - item.discount / 100) *
                                            (1 +
                                              (lead.leadDetails.interState
                                                ? item.gstSlab / 100
                                                : item.gstSlab / 100))
                                        ).toFixed(2)}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                              {lead.itemDetails.length > 0 && (
                                <tfoot className="">
                                  <tr>
                                    <td colSpan={12}>
                                      <PivotTable
                                        items={lead.itemDetails}
                                        isInterState={
                                          lead.leadDetails.interState
                                        }
                                        className="max-w-[30rem] sm:w-fit border border-gray-400"
                                      />
                                    </td>
                                    <td>
                                      <tr className="text-red-600">
                                        <td
                                          colSpan={12}
                                          className="px-1 text-right font-semibold"
                                        >
                                          Total Amount
                                        </td>
                                        <td className="px-1 font-semibold">
                                          ₹
                                          {lead.itemDetails
                                            .reduce(
                                              (acc, item) =>
                                                acc +
                                                item.qty *
                                                  item.rate *
                                                  (1 - item.discount / 100),
                                              0
                                            )
                                            .toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr className="text-red-600">
                                        <td
                                          colSpan={12}
                                          className="px-1 text-right font-semibold"
                                        >
                                          IGST
                                        </td>
                                        <td className="px-1 font-semibold">
                                          ₹
                                          {lead.leadDetails.interState
                                            ? lead.itemDetails
                                                .reduce((acc, item) => {
                                                  const taxable =
                                                    item.qty *
                                                    item.rate *
                                                    (1 - item.discount / 100);
                                                  return (
                                                    acc +
                                                    (taxable * item.gstSlab) /
                                                      100
                                                  );
                                                }, 0)
                                                .toFixed(2)
                                            : "0.00"}
                                        </td>
                                      </tr>
                                      <tr className="text-red-600">
                                        <td
                                          colSpan={12}
                                          className="px-1 text-right font-semibold"
                                        >
                                          SGST
                                        </td>
                                        <td className="px-1 font-semibold">
                                          ₹
                                          {lead.leadDetails.interState
                                            ? "0.00"
                                            : lead.itemDetails
                                                .reduce((acc, item) => {
                                                  const taxable =
                                                    item.qty *
                                                    item.rate *
                                                    (1 - item.discount / 100);
                                                  return (
                                                    acc +
                                                    (taxable * item.gstSlab) /
                                                      200
                                                  );
                                                }, 0)
                                                .toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr className="text-red-600">
                                        <td
                                          colSpan={12}
                                          className="px-1 text-right font-semibold"
                                        >
                                          CGST
                                        </td>
                                        <td className="px-1 font-semibold">
                                          ₹
                                          {lead.leadDetails.interState
                                            ? "0.00"
                                            : lead.itemDetails
                                                .reduce((acc, item) => {
                                                  const taxable =
                                                    item.qty *
                                                    item.rate *
                                                    (1 - item.discount / 100);
                                                  return (
                                                    acc +
                                                    (taxable * item.gstSlab) /
                                                      200
                                                  );
                                                }, 0)
                                                .toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr className="text-red-600">
                                        <td
                                          colSpan={12}
                                          className="px-1 text-right font-semibold"
                                        >
                                          Grand Total
                                        </td>
                                        <td className="px-1 font-semibold">
                                          ₹
                                          {lead.itemDetails
                                            .reduce((acc, item) => {
                                              const taxable =
                                                item.qty *
                                                item.rate *
                                                (1 - item.discount / 100);
                                              return (
                                                acc +
                                                taxable *
                                                  (1 + item.gstSlab / 100)
                                              );
                                            }, 0)
                                            .toFixed(2)}
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>
                                </tfoot>
                              )}
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

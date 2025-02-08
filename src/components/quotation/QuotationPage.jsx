import { useEffect, useState } from "react";
import QuotationForm from "./QuotationForm";
import { FaEdit, FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Bars, FallingLines } from "react-loader-spinner";

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
      assignedToId: "UID-Infini8",
      assignedTo: "Rahul",
      leadType: "CRR",
      punchedById: "UID-Infini8",
      punchedBy: "Kashif",
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
      assignedToId: "UID-Infini8",
      assignedTo: "Rahul",
      leadType: "CRR",
      punchedById: "UID-005",
      punchedBy: "Kashif",
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
      assignedToId: "UID-003",
      assignedTo: "John",
      leadType: "NBD",
      punchedById: "UID-005",
      punchedBy: "Emily",
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
      assignedToId: "UID-004",
      assignedTo: "Sophia",
      leadType: "NBD",
      punchedById: "UID-005",
      punchedBy: "Mark",
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
      assignedToId: "UID-005",
      assignedTo: "Liam",
      leadType: "CRR",
      punchedById: "UID-005",
      punchedBy: "Noah",
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
  {
    leadDetails: {
      name: "Company B",
      id: 3,
      address: "45 Elm Street",
      countryCode: "US",
      country: "United States",
      stateCode: "NY",
      state: "New York",
      city: "New York City",
      leadSource: "Trade Show",
      industryType: "Technology",
      contactPerson: "Alice Johnson",
      number: "9876543210",
      email: "alice.johnson@example.com",
      designation: "CTO",
      enquiryType: "Warm",
      timestamp: "24/01/2025, 6:00 pm",
      assignedToId: "UID-Infini8",
      assignedTo: "Michael",
      leadType: "NBD",
      punchedById: "UID-001",
      punchedBy: "Sophia",
      status: "In Progress",
      leadId: "L-003",
    },
    itemDetails: Array.from({ length: 25 }, (_, i) => ({
      category: "Category " + (i + 1),
      name: "Item " + (i + 1),
      qty: (i + 1).toString(),
      price: (i + 1) * 10,
      total: (i + 1) * 10,
    })),
  },
];

function QuotationPage() {
  const [quotations, setQuotations] = useState([]);
  const [editLeadId, setEditLeadId] = useState("");
  const [leadToEdit, setLeadToEdit] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  // filtering leads based on search input
  const filteredQuotations = quotations.filter((quotation) =>
    Object.values(quotation)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // changing pagination
  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  // edit quotation function
  const handleEditQuotations = (e, leadId) => {
    e.stopPropagation();
    setLeadToEdit(
      dummyLeads.find((lead) => lead.leadDetails.leadId === leadId)
    );
    setIsModalOpen(true);
    setEditLeadId(leadId);
  };

  // showing number of paginated quotations
  const paginatedQuotations = filteredQuotations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // page count to show in ui
  const pageCount = Math.ceil(filteredQuotations.length / itemsPerPage);

  // quoitation deletion handler
  // const handleDelete = (index) => {
  //   const updatedQuotations = quotations.filter((_, i) => i !== index);
  //   setQuotations(updatedQuotations);
  // };

  // fetching quotations from database
  useEffect(() => {
    async function fetchQuotes() {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const res = await axios.get("http://localhost:8001/quotations");

        if (res.status !== 200) {
          throw new Error(`Failed to fetch quotations: ${res.statusText}`);
        }

        const data = res.data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: Expected an array");
        }

        setQuotations(data);
      } catch (err) {
        console.error("Error fetching quotations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4">
      <ToastContainer />

      {isModalOpen && (
        <QuotationForm
          onQuotationsSave={handleEditQuotations}
          closeModal={() => setIsModalOpen(false)}
          leadId={editLeadId}
          data={leadToEdit}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search quotations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 border border-gray-300 bg-gray-100 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-black"
        />
      </div>

      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-1 px-12 text-left font-medium text-sm">Timestamp</th>
              <th className="py-1  text-center font-medium text-sm">Lead ID</th>
              {/* <th className="py-1 px-3 text-left font-medium text-sm">Source</th> */}
              <th className="py-1 px-3 text-left font-medium text-sm">
                Client Name
              </th>
              <th className="py-1 px-6 text-center font-medium text-sm">
                Quotation No.
              </th>
              <th className="py-1 px-3 text-left font-medium text-sm">
                Quotation Amount
              </th>
              <th className="py-1 px-3 text-left font-medium text-sm">PDF URL</th>
              <th className="py-1 px-3 text-left font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className=" w-full py-2 text-center">
                  <div className="flex justify-center">
                    <Bars
                      height="25"
                      width="25"
                      color="#6b7280"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                </td>
              </tr>
            ) : paginatedQuotations.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 w-full py-4 text-center text-gray-500"
                >
                  No quotations found
                </td>
              </tr>
            ) : (
              paginatedQuotations.map((quotation, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border border-t-gray-300"
                >
                  <td className="px-2 py-1 text-sm">
                    {new Date().toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-2 py-1 text-sm">{quotation.leadId}</td>
                  <td className="px-2 py-1 text-sm">{quotation.clientName}</td>
                  <td className="px-2 py-1 text-sm">{quotation.quotationNo}</td>
                  <td className="px-2 py-1 text-sm">{quotation.amount}</td>
                  <td className="px-2 py-1 text-sm">
                    <a
                      href={quotation.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline"
                    >
                      <FaFilePdf size={20} />
                    </a>
                  </td>
                  <td className="px-2 py-1 text-center text-sm">
                    <button
                      onClick={(e) => handleEditQuotations(e, quotation.leadId)}
                      className="text-indigo-600 mr-2 hover:text-indigo-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    {/* <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt size={20} />
                    </button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-800 font-semibold">
          {filteredQuotations.length} of {quotations.length} entries
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          previousLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Prev
            </span>
          }
          nextLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Next
            </span>
          }
          activeClassName="bg-indigo-600 text-white font-semibold px-2 rounded-sm transition-all"
          disabledClassName="text-gray-400 cursor-not-allowed"
          pageClassName="px-2 rounded-sm  text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all"
          breakClassName="text-gray-600"
        />
      </div>
    </div>
  );
}

export default QuotationPage;

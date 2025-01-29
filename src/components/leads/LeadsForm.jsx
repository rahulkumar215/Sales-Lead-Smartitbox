import { useState } from "react";
import { generatePDF } from "./pdf";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import LeadsInput from "./LeadsInput";
import QuotationForm from "./QuotationForm";

const userInfo = {
  uid: "UID-Infini8",
  name: "Rahul",
  mobile: "9319444628",
  email: "rk83029014@gmail.com",
  designation: "sales",
  department: "executive",
  username: "Infini8",
  password: "415263",
};

const dateOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const newItem = {
  category: "",
  name: "",
  id: "",
  units: "",
  qty: "",
  rate: "",
  discount: "",
  gstSlab: "",
  subtotal: "",
};

const LeadsForm = ({ leadId, onLeadSave, closeModal, data = "" }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [leadType, setLeadType] = useState(
    data ? data.leadDetails.leadType : ""
  );
  const [items, setItems] = useState(data ? [...data.itemDetails] : [newItem]);
  const [companyDetails, setCompanyDetails] = useState(
    data ? data.leadDetails : ""
  );

  const handleAddLeads = (e) => {
    e.preventDefault();
    companyDetails["timestamp"] = new Date().toLocaleDateString(
      "en-IN",
      dateOptions
    );
    companyDetails["assignedTo"] = "Rahul";
    companyDetails["leadType"] = leadType;
    companyDetails["puchedBy"] = "Kashif";
    companyDetails["status"] = "Pending";
    companyDetails["leadId"] = leadId;

    onLeadSave(companyDetails, items);
    items.length > 0 && generatePDF(companyDetails, items);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div
        className="bg-white sm:w-[90vw] w-11/12 rounded-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <form
          onSubmit={handleAddLeads}
          className="mx-auto p-5 bg-white rounded-lg"
        >
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
            Capture New Lead
          </h2>

          {/* Company Details */}
          <LeadsInput
            data={data}
            leadId={leadId}
            leadType={leadType}
            setLeadType={setLeadType}
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />

          {/* Quotation Entry */}
          {showQuoteModal ? (
            <QuotationForm items={items} setItems={setItems} />
          ) : (
            <button
              onClick={() => setShowQuoteModal(true)}
              type="button"
              className="px-4 mt-2 py-2 bg-teal-600 flex items-center justify-center gap-2 text-white rounded-md hover:bg-teal-700 focus:outline-none"
            >
              <FaEdit size={20} />
              Create Quotation
            </button>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadsForm;

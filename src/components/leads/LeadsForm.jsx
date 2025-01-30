import { useEffect, useState } from "react";
import { generatePDF } from "./pdf";
import { FaEdit } from "react-icons/fa";
import LeadsInput from "./LeadsInput";
import QuotationForm from "./QuotationForm";

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
};

const LeadsForm = ({ leadId, onLeadSave, closeModal, data = "" }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [leadType, setLeadType] = useState("");
  const [items, setItems] = useState([newItem]);
  const [companyDetails, setCompanyDetails] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (data) {
      setCompanyDetails(data.leadDetails);
      setItems(data.itemDetails);
      setLeadType(data.leadDetails.leadType);
      setCompany(data.leadDetails.name);
      setShowQuoteModal(data.itemDetails.length > 0);
    }
  }, [data]);

  const handleAddLeads = (e) => {
    e.preventDefault();
    companyDetails["timestamp"] = new Date().toLocaleDateString(
      "en-IN",
      dateOptions
    );
    companyDetails["assignedTo"] = "Rahul";
    companyDetails["leadType"] = leadType;
    companyDetails["punchedBy"] = "Kashif";
    companyDetails["status"] = "Pending";
    companyDetails["leadId"] = leadId;
    companyDetails["interState"] = false;

    onLeadSave(companyDetails, items);
    items.length > 0 && generatePDF(companyDetails, items);
  };

  const handleClose = () => {
    setItems([]);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div
        className="bg-white w-11/12 rounded-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
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
            leadId={leadId}
            leadType={leadType}
            setLeadType={setLeadType}
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
            company={company}
            setCompany={setCompany}
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
              onClick={handleClose}
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

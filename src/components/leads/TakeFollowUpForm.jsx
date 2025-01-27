import { useState } from "react";

const TakeFollowUpForm = ({ leadId, onSave, closeModal }) => {
  const [status, setStatus] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const response = {
      timestamp,
      leadId,
      status,
      remarks: status === "In-Process" ? remarks : "",
      followUpDate: status === "In-Process" ? followUpDate : "",
      finalAmount: status === "Won" ? finalValue : "",
      reason: status === "Lost" ? reason : "",
    };
    onSave(response);
    handleClose();

    console.log(response);
  };

  const handleClose = () => {
    closeModal(false);
    setStatus("");
    setFinalValue("");
    setReason("");
    setRemarks("");
    setFollowUpDate("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white sm:w-96 w-11/12 rounded-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-6 border-b-2 border-gray-400">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
          {/* Quotation Entry */}
          Take Follow Up
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">
              Lead Status <span className="text-red-600 text-lg">*</span>
            </label>
            <select
              value={status}
              required
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Status</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="In-Process">In-Process</option>
            </select>
          </div>

          {status === "Won" && (
            <div>
              <label className="block text-gray-600 font-medium">
                Final Value <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                type="number"
                value={finalValue}
                required
                onChange={(e) => setFinalValue(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {status === "Lost" && (
            <div>
              <label className="block text-gray-600 font-medium">
                Reason <span className="text-red-600 text-lg">*</span>
              </label>
              <textarea
                value={reason}
                required
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {status === "In-Process" && (
            <>
              <div>
                <label className="block text-gray-600 font-medium">
                  Discussion <span className="text-red-600 text-lg">*</span>
                </label>
                <textarea
                  value={remarks}
                  required
                  onChange={(e) => setRemarks(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Follow Up Date <span className="text-red-600 text-lg">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}
        </form>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={handleClose}
            type="button"
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            type="submit"
            disabled={!status}
            className={`px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 ${
              !status ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Save Follow Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeFollowUpForm;

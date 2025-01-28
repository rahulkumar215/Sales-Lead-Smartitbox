import { useState } from "react";

function EditItemForm({ onSaveItem, onClose, initialItem }) {
  const [formData, setFormData] = useState({
    id: initialItem?.id || "",
    category: initialItem?.category || "",
    itemName: initialItem?.itemName || "",
    units: initialItem?.units || "",
    rate: initialItem?.rate || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSaveItem({
      ...formData,
      timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }); // Pass the updated item to the parent function
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 w-[90vw] sm:w-1/3 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl text-indigo-600 font-semibold mb-4">
          Edit Item
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block  text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border text-sm border-gray-300 rounded p-1"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className="w-full border text-sm border-gray-300 rounded p-1"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Units</label>
            <input
              type="text"
              name="units"
              value={formData.units}
              onChange={handleInputChange}
              className="w-full border text-sm border-gray-300 rounded p-1"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Rate</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              className="w-full border text-sm border-gray-300 rounded p-1"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose} // Reset form to initial data
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemForm;

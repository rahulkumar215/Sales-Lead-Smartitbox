import { useState } from "react";

function EditCompanyForm({ companyData, onEditCompany, onClose }) {
  const [formData, setFormData] = useState(companyData || {});

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onEditCompany(formData);
  };

  const handleCancel = () => {
    setFormData(companyData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-3 w-[90vw] sm:w-1/3 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Edit Company
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Company Name", name: "companyName" },
              { label: "Address", name: "address" },
              { label: "GST", name: "gst" },
              { label: "Country", name: "country" },
              { label: "State", name: "state" },
              { label: "City", name: "city" },
              { label: "Industry Type", name: "industryType" },
              { label: "Contact Person", name: "contactPerson" },
              { label: "Designation", name: "designation" },
              { label: "Number", name: "number" },
              { label: "Email ID", name: "email" },
            ].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type="text"
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  className="border text-sm border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel} // Reset form to initial data
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCompanyForm;

import { useRef, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import FileUpload from "./FileUpload";

// eslint-disable-next-line react/prop-types
const CompanyForm = ({ onAddCompany, closeModal }) => {
  const [companies, setCompanies] = useState([
    {
      companyName: "",
      address: "",
      gst: "",
      country: "",
      state: "",
      city: "",
      industryType: "",
      contactPerson: "",
      number: "",
      email: "",
      designation: "",
    },
  ]);
  const inputRefs = useRef([]);

  const handleInputChange = (index, field, value) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index][field] = value;
    setCompanies(updatedCompanies);
  };

  const removeCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  const addCompany = () => {
    setCompanies([
      ...companies,
      {
        companyName: "",
        address: "",
        gst: "",
        country: "",
        state: "",
        city: "",
        industryType: "",
        contactPerson: "",
        number: "",
        email: "",
        designation: "",
      },
    ]);
    setTimeout(() => {
      inputRefs.current[companies.length]?.focus();
    }, 0);
  };

  const handleFileUpload = (data) => {
    setCompanies(data);
  };

  const handleSubmit = (e) => {
    console.log("I was called");
    e.preventDefault();
    // if (companies.some((company) => !company.companyName || !company.email)) {
    //   alert("Company Name and Email are required for all entries.");
    //   return;
    // }
    onAddCompany(companies);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-3 w-[90vw] rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg w-full mx-auto"
        >
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Add Company
          </h2>

          <FileUpload onFileData={handleFileUpload}>
            Import Customers from excel.
          </FileUpload>

          {/* Labels for all inputs */}
          <div className="hidden sm:grid text-sm grid-cols-[repeat(11,_1fr),_20px] items-center gap-1 mb-2 text-gray-700 bg-blue-200 rounded-md font-medium py-1">
            <span className="w-full pl-2">Company Name</span>
            <span className="w-full">Address</span>
            <span className="w-full">GST</span>
            <span className="w-full">Country</span>
            <span className="w-full">State</span>
            <span className="w-full">City</span>
            <span className="w-full">Industry</span>
            <span className="w-full">Contact Person</span>
            <span className="w-full">Designation</span>
            <span className="w-full">Number</span>
            <span className="w-full">Email</span>
            <span className="w-fit h-0">
              &nbsp; <span className="text-red-600 text-lg">&nbsp;</span>
            </span>
          </div>

          {companies.map((company, index) => (
            <div
              key={index}
              className="grid sm:grid-cols-[repeat(11,_1fr)_min-content] items-center gap-1 bg-gray-50 rounded-md shadow-sm mb-2"
            >
              <p className="w-full sm:hidden text-center py-1 bg-gray-300 rounded-md">
                Company : {index + 1}
              </p>
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
              ].map((field, i) => (
                <div key={i}>
                  <input
                    key={field.name}
                    ref={
                      field.name === "companyName"
                        ? (el) => (inputRefs.current[index] = el)
                        : null
                    }
                    type="text"
                    required={field.required}
                    placeholder={field.label + (field.required ? " *" : "")}
                    value={company[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(index, field.name, e.target.value)
                    }
                    className="border text-sm border-gray-300 rounded-md p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}

              <button
                onClick={() => removeCompany(index)}
                type="button"
                className="py-1 px-2 sm:p-0 flex w-full sm:w-fit items-center justify-center gap-2 bg-red-600 sm:bg-transparent sm:text-red-600 rounded-md sm:hover:text-red-700 focus:outline-none"
              >
                <FaTrashAlt size={20} className=" text-white sm:text-inherit" />
                <span className=" text-white sm:hidden">Delete</span>
              </button>

              {/* <button
                onClick={() => removeCompany(index)}
                className="!text-red-600 hover:text-red-800 font-bold !bg-transparent"
              >
                <FaTrashAlt size={20} />
              </button> */}
            </div>
          ))}

          <div className=" sticky bottom-0 flex justify-end mt-4 gap-2 sm:gap-4 items-center">
            <button
              type="button"
              onClick={addCompany}
              className="px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
            >
              <FaPlus size={16} />
            </button>
            <button
              type="submit"
              className="!bg-indigo-600 text-white px-3 py-1 rounded-sm hover:bg-indigo-700"
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              className="!bg-gray-500 text-white px-3 py-1 rounded-sm hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;

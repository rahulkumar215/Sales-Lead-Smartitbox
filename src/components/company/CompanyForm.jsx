import { useState } from "react";
import * as XLSX from "xlsx"; // Install xlsx for Excel parsing

const CompanyForm = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    industryType: "",
    contactPerson: "",
    number: "",
    email: "",
    designation: "",
    designationType: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleAddCompany = () => {
    if (Object.values(newCompany).some((field) => !field)) {
      alert("Please fill all fields before adding a company.");
      return;
    }
    setCompanies([...companies, newCompany]);
    setNewCompany({
      companyName: "",
      address: "",
      country: "",
      state: "",
      city: "",
      industryType: "",
      contactPerson: "",
      number: "",
      email: "",
      designation: "",
      designationType: "",
      department: "",
    });
    alert("Company added successfully!");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith(".xlsx")) {
      alert("Please upload a valid Excel file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setCompanies(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSampleDownload = () => {
    const sampleData = [
      {
        companyName: "Example Company",
        address: "123 Example Street",
        country: "Country",
        state: "State",
        city: "City",
        industryType: "Industry Type",
        contactPerson: "John Doe",
        number: "1234567890",
        email: "example@company.com",
        designation: "Manager",
        designationType: "Full-Time",
        department: "HR",
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SampleData");
    XLSX.writeFile(workbook, "SampleData.xlsx");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Company Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form>
          <h2 className="text-xl font-semibold mb-4">Company Form</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Company Name", name: "companyName" },
              { label: "Address", name: "address" },
              { label: "Country", name: "country" },
              { label: "State", name: "state" },
              { label: "City", name: "city" },
              { label: "Industry Type", name: "industryType" },
              { label: "Contact Person", name: "contactPerson" },
              { label: "Number", name: "number", type: "tel" },
              { label: "Email ID", name: "email", type: "email" },
              { label: "Designation", name: "designation" },
              { label: "Designation Type", name: "designationType" },
              { label: "Department", name: "department" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={newCompany[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
            ))}
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Excel File
            </label>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="w-full mt-1"
            />
          </div>

          <div className="flex items-center mt-4">
            <button
              type="button"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
              onClick={handleAddCompany}
            >
              Add Company
            </button>
            <button
              type="button"
              className="ml-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200"
              onClick={handleSampleDownload}
            >
              Download Sample Data
            </button>
          </div>
        </form>

        {/* Display Companies */}
        {companies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Added Companies</h2>
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(companies[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 border border-gray-300 text-left"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={index}>
                    {Object.values(company).map((value, idx) => (
                      <td
                        key={idx}
                        className="px-4 py-2 border border-gray-300"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyForm;

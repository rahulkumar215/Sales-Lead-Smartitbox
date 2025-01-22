import { useState } from "react";
import Select from "react-select";

const LeadsForm = ({ onLeadSave, closeModal }) => {
  const [company, setCompany] = useState("");
  const [companyDetails, setCompanyDetails] = useState();
  const [items, setItems] = useState([
    {
      category: "",
      name: "",
      qty: "",
      price: "",
      total: "",
    },
  ]);

  const companyData = [
    {
      name: "Company A",
      id: 1,
      address: "r z c-56",
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      leadSource: "LinkedIn",
      industryType: "manufacturing",
      contactPerson: "Rahul",
      number: "9319444628",
      email: "rk83029014@gmail.com",
      designation: "MD",
      designationType: "Director",
      department: "Account",
      enquiryType: "HOT",
    },
  ];

  const companyList = ["NBD", ...companyData.map((company) => company.name)];

  const itemCategories = [
    { name: "Electronics", id: 1 },
    { name: "Furniture", id: 2 },
    { name: "Stationery", id: 3 },
  ];

  const itemsList = {
    1: ["Laptop", "Phone", "Tablet"],
    2: ["Chair", "Table", "Sofa"],
    3: ["Pen", "Notebook", "Folder"],
  };

  const options = companyList.map((company) => ({
    value: company,
    label: company,
  }));

  const handleInputChange = (field, value) => {
    // Check if the field is related to company details, if so, update those
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value, // Dynamically update the specific field
    }));
  };

  // Update the `handleSelectChange` to set the company first and then populate its details
  const handleSelectChange = (selectedOption) => {
    const selectedCompanyName = selectedOption?.value || "";
    setCompany(selectedCompanyName);

    // Fetch company details based on the selected company (dummy data for now)
    const selectedCompany = companyData.find(
      (company) => company.name === selectedCompanyName
    );

    if (selectedCompany) {
      setCompanyDetails(selectedCompany);
    } else {
      // Reset to default if no matching company is found
      setCompanyDetails({
        name: "",
        id: Date.now(),
        address: "",
        country: "",
        state: "",
        city: "",
        leadSource: "",
        industryType: "",
        contactPerson: "",
        number: "",
        email: "",
        designation: "",
        designationType: "",
        department: "",
        enquiryType: "",
      });
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        category: "",
        name: "",
        qty: "",
        price: "",
        total: "",
      },
    ]);
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    if (name === "qty" || name === "price") {
      updatedItems[index].total =
        Number(updatedItems[index].qty) * Number(updatedItems[index].price);
    }
    setItems(updatedItems);
  };

  const handleAddLeads = () => {
    console.log(companyDetails);
    console.log(items);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div
        className="bg-white w-[80vw] rounded-lg max-h-[80vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="mx-auto p-5 bg-white rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-600 mb-4">
            {/* Quotation Entry */}
            New Lead
          </h2>

          {/* Company Details */}
          <div className="pb-6 border-b-2 border-gray-400">
            <label className="block text-gray-600 font-medium mb-2">
              Add NBD/ Select CRR
            </label>
            <Select
              value={options.find((option) => option.value === company) || null}
              onChange={handleSelectChange}
              options={options}
              isClearable
              placeholder="Search and select company..."
              className="min-w-[15rem] max-w-fit mb-4"
              classNamePrefix="react-select"
            />

            {/* Lead Details */}
            {company && companyDetails && (
              <div>
                <div className="flex gap-4 pb-2">
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Lead Id
                    </label>
                    <input
                      type="text"
                      value="L-001"
                      disabled
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Lead Type
                    </label>
                    <input
                      type="text"
                      value={companyDetails.name === "" ? "NBD" : "CRR"}
                      disabled
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-2 flex gap-4">
                  {companyDetails.name === "" && (
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        defaultValue={companyDetails.name}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="ABC Corp"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={companyDetails.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="123 Business Ave, Suite 100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={companyDetails.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="USA"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={companyDetails.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="California"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={companyDetails.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="San Francisco"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Lead Source
                      </label>
                      <input
                        type="text"
                        value={companyDetails.leadSource}
                        onChange={(e) =>
                          handleInputChange("leadSource", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Referral"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Industry Type
                      </label>
                      <input
                        type="text"
                        value={companyDetails.industryType}
                        onChange={(e) =>
                          handleInputChange("industryType", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Software"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        value={companyDetails.contactPerson}
                        onChange={(e) =>
                          handleInputChange("contactPerson", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        defaultValue={companyDetails.number}
                        onChange={(e) =>
                          handleInputChange("whatsappNumber", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+1 555-123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        value={companyDetails.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="johndoe@email.com"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={companyDetails.designation}
                        onChange={(e) =>
                          handleInputChange("designation", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Designation Type
                      </label>
                      <input
                        type="text"
                        value={companyDetails.designationType}
                        onChange={(e) =>
                          handleInputChange("designationType", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Sales"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        value={companyDetails.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Marketing"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Enquiry Type
                      </label>
                      <input
                        type="text"
                        value={companyDetails.enquiryType}
                        onChange={(e) =>
                          handleInputChange("enquiryType", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Product Inquiry"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="mb-6 mt-2">
            <h3 className="text-xl font-semibold mb-2">Items Description</h3>

            {/* Labels for all inputs */}
            <div className="flex space-x-4 mb-2 text-gray-500 font-medium">
              <span className="w-1/4">Category</span>
              <span className="w-1/4">Item Name</span>
              <span className="w-1/4">Quantity</span>
              <span className="w-1/4">Price</span>
              <span className="w-1/4">Total</span>
            </div>

            {/* Dynamic Input Rows */}
            {items.map((item, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                {/* Category Dropdown */}
                <select
                  name="category"
                  value={item.category}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  {itemCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Item Dropdown */}
                <select
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={!item.category}
                >
                  <option value="">Select Item</option>
                  {item.category &&
                    itemsList[item.category].map((itemName, idx) => (
                      <option key={idx} value={itemName}>
                        {itemName}
                      </option>
                    ))}
                </select>

                {/* Quantity Input */}
                <input
                  type="number"
                  name="qty"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Qty"
                />

                {/* Price Input */}
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Price"
                />

                {/* Total Display */}
                <input
                  type="number"
                  value={item.total}
                  readOnly
                  className="w-1/4 p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                  placeholder="Total"
                />
              </div>
            ))}

            {/* Add Item Button and Total Summary */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
              >
                Add Item
              </button>

              <div className="bg-blue-500 px-3 py-2 rounded-md">
                <h3 className="font-bold text-base text-white">
                  Total :{" "}
                  <span>
                    {items.reduce((acc, item) => acc + (item.total || 0), 0)}
                  </span>
                </h3>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLeads}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsForm;

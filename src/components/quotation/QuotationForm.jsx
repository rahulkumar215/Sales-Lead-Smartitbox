import { useState } from "react";

const QuotationForm = ({ onQuotationsSave, closeModal }) => {
  const [company, setCompany] = useState("");
  const [companyDetails, setCompanyDetails] = useState({});
  const [items, setItems] = useState([]);

  const companyList = [
    { name: "Company A", id: 1 },
    { name: "Company B", id: 2 },
    { name: "Company C", id: 3 },
  ];

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

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
    // Fetch company details here based on the selected company (dummy data for now)
    const selectedCompany = companyList.find(
      (company) => company.name === e.target.value
    );
    if (selectedCompany) {
      setCompanyDetails({
        name: selectedCompany.name,
        address: "123 Street, City",
        country: "Country",
        state: "State",
        city: "City",
        contactPerson: "John Doe",
        number: "+123456789",
        email: "johndoe@example.com",
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
        total: 0,
      },
    ]);
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    if (name === "qty" || name === "price") {
      updatedItems[index].total =
        updatedItems[index].qty * updatedItems[index].price;
    }
    setItems(updatedItems);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-3 w-[80vw] rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-600 mb-6">
            Quotation Entry
          </h2>

          {/* Company Details */}
          <div className="mb-6">
            <label className="block text-indigo-600 font-medium mb-2">
              Select Company
            </label>
            <select
              value={company}
              onChange={handleCompanyChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Search and select company...</option>
              {companyList.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>

            {company && companyDetails && (
              <div className="mt-4 grid grid-cols-7 gap-4">
                <div>
                  <label className="block text-indigo-600 font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={companyDetails.address}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 font-medium mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={companyDetails.country}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={companyDetails.state}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={companyDetails.city}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 font-medium mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={companyDetails.contactPerson}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={companyDetails.number}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    value={companyDetails.email}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="mb-6">
            <label className="block text-indigo-600 font-medium mb-2">
              Items
            </label>
            {items.map((item, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <select
                  name="category"
                  value={item.category}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Category</option>
                  {itemCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
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

                <input
                  type="number"
                  name="qty"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Qty"
                />

                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Price"
                />

                <input
                  type="number"
                  value={item.total}
                  readOnly
                  className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                  placeholder="Total"
                />
              </div>
            ))}
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
            >
              Add Item
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none">
              Save Quotation
            </button>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationForm;

import { useEffect, useState } from "react";
import Select from "react-select";
import { fetchCities, fetchCountries, fetchStates } from "../api/Index";
import { generatePDF } from "./pdf";

const LeadsForm = ({ onLeadSave, closeModal }) => {
  const [company, setCompany] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [leadType, setLeadType] = useState("");
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
      designationType: "Director",
      department: "Finance",
      enquiryType: "Hot",
    },
  ];

  const companyList = ["NBD", ...companyData.map((company) => company.name)];

  const itemCategories = [
    { name: "Electronics", id: 1 },
    { name: "Furniture", id: 2 },
    { name: "Stationery", id: 3 },
  ];

  const itemsList = {
    Electronics: ["Laptop", "Phone", "Tablet"],
    Furniture: ["Chair", "Table", "Sofa"],
    Stationery: ["Pen", "Notebook", "Folder"],
  };

  const options = companyList.map((company) => ({
    value: company,
    label: company,
  }));

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [fetchedCountries, fetchedStates, fetchedCities] =
          await Promise.all([
            fetchCountries(),
            fetchStates("IN"),
            fetchCities("DL"),
          ]);

        setCountries(fetchedCountries);
        setStates(fetchedStates);
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleInputChange = async (field, value) => {
    setCompanyDetails((prevDetails) => {
      if (field === "country") {
        return {
          ...prevDetails,
          countryCode: value.code,
          country: value.name,
          stateCode: "",
          state: "",
        };
      }
      if (field === "state") {
        return {
          ...prevDetails,
          stateCode: value.code,
          state: value.name,
        };
      }
      return {
        ...prevDetails,
        [field]: value,
      };
    });

    try {
      if (field === "country") {
        const fetchedStates = await fetchStates(value.code);
        setStates(fetchedStates);
        setCities([]); // Reset cities when the country changes
      }

      if (field === "state") {
        const fetchedCities = await fetchCities(value.code);
        setCities(fetchedCities);
      }
    } catch (error) {
      console.error(`Error fetching data for field "${field}":`, error);
    }
  };

  const handleSelectChange = (selectedOption) => {
    const selectedCompanyName = selectedOption?.value || "";
    setCompany(selectedCompanyName);

    const selectedCompany = companyData.find(
      (company) => company.name === selectedCompanyName
    );

    if (selectedCompany) {
      setLeadType("CRR");
      setCompanyDetails(selectedCompany);
    } else {
      // Reset to default if no matching company is found
      setLeadType("NBD");
      setCompanyDetails({
        name: "",
        id: Date.now(),
        address: "",
        countryCode: "",
        country: "",
        stateCode: "",
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

  const handleAddLeads = (e) => {
    e.preventDefault();
    generatePDF(companyDetails, items);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div
        className="bg-white w-[80vw] rounded-lg max-h-[80vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <form
          onSubmit={handleAddLeads}
          className="mx-auto p-5 bg-white rounded-lg"
        >
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
            {/* Quotation Entry */}
            New Lead
          </h2>

          {/* Company Details */}
          <div className="pb-6 border-b-2 border-gray-400">
            <label className="block text-gray-600 font-medium mb-2">
              Add NBD/ Select CRR{" "}
              <span className="text-red-600 text-lg">*</span>
            </label>
            <Select
              value={options.find((option) => option.value === company) || null}
              onChange={handleSelectChange}
              options={options}
              isClearable
              placeholder="Search and select company..."
              className="min-w-[15rem] max-w-fit mb-4"
              classNamePrefix="react-select"
              required
            />

            {/* Lead Details */}
            {company && companyDetails && (
              <div>
                <div className="flex gap-4 pb-2">
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Lead Id <span className="text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="text"
                      value="L-001"
                      disabled
                      required
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Lead Type <span className="text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="text"
                      value={leadType}
                      disabled
                      required
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-2 flex gap-4">
                  {leadType === "NBD" && (
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Company Name{" "}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={companyDetails.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="ABC Corp"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Address <span className="text-red-600 text-lg">*</span>
                    </label>
                    <input
                      type="text"
                      value={companyDetails.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      required
                      className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="123 Business Ave, Suite 100"
                    />
                  </div>

                  {/* Country Dropdown */}
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      Country
                    </label>
                    <select
                      value={companyDetails.countryCode}
                      onChange={(e) => {
                        const selectedCountry = countries.find(
                          (country) => country.iso2 === e.target.value
                        );
                        handleInputChange("country", {
                          code: selectedCountry?.iso2 || "",
                          name: selectedCountry?.name || "",
                        });
                      }}
                      className="w-full p-[.4rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State Dropdown */}
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      State
                    </label>
                    <select
                      value={companyDetails.stateCode}
                      onChange={(e) => {
                        const selectedState = states.find(
                          (state) => state.iso2 === e.target.value
                        );
                        handleInputChange("state", {
                          code: selectedState?.iso2 || "",
                          name: selectedState?.name || "",
                        });
                      }}
                      disabled={companyDetails.countryCode === ""}
                      className="w-full p-[.4rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.iso2} value={state.iso2}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City Dropdown */}
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">
                      City
                    </label>
                    <select
                      value={companyDetails.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      disabled={companyDetails.stateCode === ""}
                      className="w-full p-[.4rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Lead Source
                      </label>
                      <select
                        value={companyDetails.leadSource}
                        onChange={(e) =>
                          handleInputChange("leadSource", e.target.value)
                        }
                        className="w-full p-[.4rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select Lead Source</option>
                        <option value="IndiaMart">IndiaMart</option>
                        <option value="JustDial">JustDial</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Reference">Reference</option>
                        <option value="Website">Website</option>
                        <option value="Direct">Direct</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Industry Type
                      </label>
                      <select
                        value={companyDetails.industryType}
                        onChange={(e) =>
                          handleInputChange("industryType", e.target.value)
                        }
                        className="w-full p-[.4rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select Industry Type</option>
                        <option value="Automobile">Automobile</option>
                        <option value="TextTiles">TextTiles</option>
                        <option value="Chemicals">Chemicals</option>
                        <option value="Steel Manufacturer">
                          Steel Manufacturer
                        </option>
                        <option value="Printing">Printing</option>
                        <option value="Finance">Finance</option>
                        <option value="Education Institute">
                          Education Institute
                        </option>
                        <option value="Furniture Manufacturer">
                          Furniture Manufacturer
                        </option>
                        <option value="FMCG Industry">FMCG Industry</option>
                        <option value="IT Industry">IT Industry</option>
                        <option value="BPO">BPO</option>
                        <option value="Construction Industry">
                          Construction Industry
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Contact Person{" "}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyDetails.contactPerson}
                        onChange={(e) =>
                          handleInputChange("contactPerson", e.target.value)
                        }
                        required
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        WhatsApp Number{" "}
                        <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={companyDetails.number}
                        onChange={(e) =>
                          handleInputChange("number", e.target.value)
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+1 555-123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Email <span className="text-red-600 text-lg">*</span>
                      </label>
                      <input
                        required
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
                      <select
                        value={companyDetails.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                        className="w-full p-[.3rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select Department</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Production">Production</option>
                        <option value="Purchase">Purchase</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Enquiry Type
                      </label>
                      <select
                        value={companyDetails.enquiryType}
                        onChange={(e) =>
                          handleInputChange("enquiryType", e.target.value)
                        }
                        className="w-full p-[.3rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select Enquiry Type</option>
                        <option value="Hot">Hot</option>
                        <option value="Cold">Cold</option>
                        <option value="Warm">Warm</option>
                      </select>
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
              <span className="w-1/4">
                Category <span className="text-red-600 text-lg">*</span>
              </span>
              <span className="w-1/4">
                Item Name <span className="text-red-600 text-lg">*</span>
              </span>
              <span className="w-1/4">
                Quantity <span className="text-red-600 text-lg">*</span>
              </span>
              <span className="w-1/4">
                Price <span className="text-red-600 text-lg">*</span>
              </span>
              <span className="w-1/4">
                Total <span className="text-red-600 text-lg">*</span>
              </span>
            </div>

            {/* Dynamic Input Rows */}
            {items.map((item, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                {/* Category Dropdown */}
                <select
                  name="category"
                  value={item.category}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  {itemCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Item Dropdown */}
                <select
                  name="name"
                  value={item.name}
                  required
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
                  required
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/4 p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Qty"
                />

                {/* Price Input */}
                <input
                  type="number"
                  name="price"
                  required
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
                  required
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

import { useEffect, useState } from "react";
import { fetchCities, fetchCountries, fetchStates } from "../api/Index";
import Select from "react-select";

const newLead = {
  name: "",
  id: Date.now(),
  gst: "",
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
};

const companyData = [
  {
    name: "Company A",
    id: 1,
    gst: "7WZCAO0239I7Z3",
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
    enquiryType: "Hot",
  },
];

function LeadsInput({
  leadId,
  data,
  leadType,
  setLeadType,
  companyDetails,
  setCompanyDetails,
}) {
  const [company, setCompany] = useState(data ? data.leadDetails.name : "");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const companyList = ["NBD", ...companyData.map((company) => company.name)];

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
      setCompanyDetails(newLead);
    }
  };
  return (
    <div className="pb-6 border-b-2 border-gray-400">
      <label className="block text-gray-600 font-medium ">
        Add NBD/ Select CRR <span className="text-red-600 text-lg">*</span>
      </label>
      <Select
        value={options.find((option) => option.value === company) || null}
        onChange={handleSelectChange}
        options={options}
        isClearable
        placeholder="Search and select company..."
        className="min-w-[15rem] max-w-fit mb-2 "
        classNamePrefix="react-select"
        required
      />

      {/* Lead Details */}
      {company && companyDetails && (
        <div className="grid sm:grid-cols-5 gap-1">
          <div>
            <label className="block text-gray-600 font-medium ">
              Lead Id <span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="text"
              value={leadId}
              disabled
              required
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium ">
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
          {leadType === "NBD" && (
            <div>
              <label className="block text-gray-600 font-medium ">
                Company Name <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                type="text"
                defaultValue={companyDetails.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="ABC Corp"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 font-medium ">
              GST <span className="text-red-600 text-lg">&nbsp;</span>
            </label>
            <input
              type="text"
              value={companyDetails.gst}
              onChange={(e) => handleInputChange("gst", e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="7WZCAO0239I7Z3"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium ">
              Address <span className="text-red-600 text-lg">*</span>
            </label>
            <input
              type="text"
              value={companyDetails.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="123 Business Ave, Suite 100"
            />
          </div>

          {/* Country Dropdown */}
          <div>
            <label className="block text-gray-600 font-medium ">
              Country <span className="text-red-600 text-lg">&nbsp;</span>
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
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Country </option>
              {countries.map((country) => (
                <option key={country.iso2} value={country.iso2}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label className="block text-gray-600 font-medium ">
              State <span className="text-red-600 text-lg">&nbsp;</span>
            </label>
            <select
              value={companyDetails.stateCode}
              disabled={companyDetails.countryCode === ""}
              onChange={(e) => {
                const selectedState = states.find(
                  (state) => state.iso2 === e.target.value
                );
                handleInputChange("state", {
                  code: selectedState?.iso2 || "",
                  name: selectedState?.name || "",
                });
              }}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label className="block text-gray-600 font-medium ">
              City <span className="text-red-600 text-lg">&nbsp;</span>
            </label>
            <select
              value={companyDetails.city}
              disabled={companyDetails.stateCode === ""}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-medium ">
              Source <span className="text-red-600 text-lg">&nbsp;</span>
            </label>
            <select
              value={companyDetails.leadSource}
              onChange={(e) => handleInputChange("leadSource", e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label className="block text-gray-600 font-medium ">
              Type <span className="text-red-600 text-lg">&nbsp;</span>
            </label>
            <select
              value={companyDetails.industryType}
              onChange={(e) =>
                handleInputChange("industryType", e.target.value)
              }
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Industry Type</option>
              <option value="Automobile">Automobile</option>
              <option value="TextTiles">TextTiles</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Steel Manufacturer">Steel Manufacturer</option>
              <option value="Printing">Printing</option>
              <option value="Finance">Finance</option>
              <option value="Education Institute">Education Institute</option>
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
            <label className="block text-gray-600 font-medium ">
              Contact Person <span className="text-red-600 text-lg">*</span>
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
            <label className="block text-gray-600 font-medium ">
              WhatsApp Number <span className="text-red-600 text-lg">*</span>
            </label>
            <input
              required
              type="text"
              value={companyDetails.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+1 555-123-4567"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium ">
              Email <span className="text-red-600 text-lg">*</span>
            </label>
            <input
              required
              type="text"
              value={companyDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="johndoe@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium ">
              Designation <span className="text-red-600 text-lg">&nbsp;</span>
            </label>
            <input
              type="text"
              value={companyDetails.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Manager"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium ">
              Enquiry Type <span className="text-red-600 text-lg">&nbsp;</span>
            </label>
            <select
              value={companyDetails.enquiryType}
              onChange={(e) => handleInputChange("enquiryType", e.target.value)}
              className="w-full p-[.3rem] border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Enquiry Type</option>
              <option value="Hot">Hot</option>
              <option value="Cold">Cold</option>
              <option value="Warm">Warm</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadsInput;

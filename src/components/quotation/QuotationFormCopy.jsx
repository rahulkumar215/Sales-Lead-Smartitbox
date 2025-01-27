// import { useState } from "react";
// import Select from "react-select";

// const QuotationForm = ({ onQuotationsSave, closeModal }) => {
//   const [company, setCompany] = useState("");
//   const [companyDetails, setCompanyDetails] = useState();
//   const [items, setItems] = useState([{}]);

//   const companyList = [
//     { name: "NBD", id: 0 },
//     { name: "Company A", id: 1 },
//     { name: "Company B", id: 2 },
//     { name: "Company C", id: 3 },
//   ];

//   const itemCategories = [
//     { name: "Electronics", id: 1 },
//     { name: "Furniture", id: 2 },
//     { name: "Stationery", id: 3 },
//   ];

//   const itemsList = {
//     1: ["Laptop", "Phone", "Tablet"],
//     2: ["Chair", "Table", "Sofa"],
//     3: ["Pen", "Notebook", "Folder"],
//   };

//   const options = companyList.map((company) => ({
//     value: company.name,
//     label: company.name,
//   }));

//   // Custom handler for React Select
//   const handleSelectChange = (selectedOption) => {
//     handleInputChange({ target: { value: selectedOption?.value || "" } });
//   };

//   const handleInputChange = (e) => {
//     setCompany(e.target.value);
//     // Fetch company details here based on the selected company (dummy data for now)
//     const selectedCompany = companyList.find(
//       (company) => company.name === e.target.value
//     );
//     if (selectedCompany) {
//       setCompanyDetails({
//         name: selectedCompany.name,
//         address: "123 Street, City",
//         country: "Country",
//         state: "State",
//         city: "City",
//         contactPerson: "John Doe",
//         number: "+123456789",
//         email: "johndoe@example.com",
//       });
//     }
//   };

//   const handleAddItem = () => {
//     setItems([
//       ...items,
//       {
//         category: "",
//         name: "",
//         qty: "",
//         price: "",
//         total: 0,
//       },
//     ]);
//   };

//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItems = [...items];
//     updatedItems[index][name] = value;
//     if (name === "qty" || name === "price") {
//       updatedItems[index].total =
//         updatedItems[index].qty * updatedItems[index].price;
//     }
//     setItems(updatedItems);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
//       <div
//         className="bg-white w-[80vw] rounded-lg max-h-[80vh] overflow-y-auto"
//         style={{ scrollbarWidth: "thin" }}
//       >
//         <div className="mx-auto p-8 bg-white rounded-lg">
//           <h2 className="text-3xl font-semibold text-gray-600 mb-6">
//             {/* Quotation Entry */}
//             New Lead
//           </h2>

//           {/* Company Details */}
//           <div className="mb-6">
//             <label className="block text-gray-600 font-medium mb-2">
//               Add NBD/ Select CRR
//             </label>
//             <Select
//               value={options.find((option) => option.value === company) || null}
//               onChange={handleSelectChange}
//               options={options}
//               isClearable
//               placeholder="Search and select company..."
//               className="w-full mb-6"
//               classNamePrefix="react-select"
//             />

//             {/* Lead Details */}
//             {company && companyDetails && (
//               <div>
//                 <div className="flex gap-4 pb-2">
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-2">
//                       Lead Id
//                     </label>
//                     <input
//                       type="text"
//                       value="L-001"
//                       disabled
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-2">
//                       Lead Type
//                     </label>
//                     <input
//                       type="text"
//                       value={companyDetails.name === "NBD" ? "NBD" : "CRR"}
//                       disabled
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex gap-4">
//                   {companyDetails.name === "NBD" && (
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Company Name
//                       </label>
//                       <input
//                         type="text"
//                         value={
//                           companyDetails.name === "NBD"
//                             ? ""
//                             : companyDetails.address
//                         }
//                         onChange={(e) =>
//                           handleInputChange("companyName", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="ABC Corp"
//                       />
//                     </div>
//                   )}

//                   <div>
//                     <label className="block text-gray-600 font-medium mb-2">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       value={
//                         companyDetails.name === "NBD"
//                           ? ""
//                           : companyDetails.address
//                       }
//                       onChange={(e) =>
//                         handleInputChange("address", e.target.value)
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="123 Business Ave, Suite 100"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-2">
//                       Country
//                     </label>
//                     <input
//                       type="text"
//                       value={
//                         companyDetails.name === "NBD"
//                           ? ""
//                           : companyDetails.country
//                       }
//                       onChange={(e) =>
//                         handleInputChange("country", e.target.value)
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="USA"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-2">
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       value={
//                         companyDetails.name === "NBD"
//                           ? ""
//                           : companyDetails.state
//                       }
//                       onChange={(e) =>
//                         handleInputChange("state", e.target.value)
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="California"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 font-medium mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       value={
//                         companyDetails.name === "NBD" ? "" : companyDetails.city
//                       }
//                       onChange={(e) =>
//                         handleInputChange("city", e.target.value)
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="San Francisco"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <div className="flex gap-4">
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Lead Source
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("leadSource", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="Referral"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Industry Type
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("industryType", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="Software"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Contact Person
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("contactPerson", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         WhatsApp Number
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("whatsappNumber", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="+1 555-123-4567"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Email
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("email", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="johndoe@email.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-4 mt-4">
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Designation
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("designation", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="Manager"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Designation Type
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("designationType", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="Sales"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Department
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("department", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="Marketing"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 font-medium mb-2">
//                         Enquiry Type
//                       </label>
//                       <input
//                         type="text"
//                         value=""
//                         onChange={(e) =>
//                           handleInputChange("enquiryType", e.target.value)
//                         }
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         placeholder="Product Inquiry"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Items List */}
//           <div className="mb-6">
//             <label className="block text-gray-600 font-medium mb-2">
//               Items
//             </label>
//             {items.map((item, index) => (
//               <div key={index} className="flex space-x-4 mb-4">
//                 <select
//                   name="category"
//                   value={item.category}
//                   onChange={(e) => handleItemChange(index, e)}
//                   className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Category</option>
//                   {itemCategories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   name="name"
//                   value={item.name}
//                   onChange={(e) => handleItemChange(index, e)}
//                   className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   disabled={!item.category}
//                 >
//                   <option value="">Select Item</option>
//                   {item.category &&
//                     itemsList[item.category].map((itemName, idx) => (
//                       <option key={idx} value={itemName}>
//                         {itemName}
//                       </option>
//                     ))}
//                 </select>

//                 <input
//                   type="number"
//                   name="qty"
//                   value={item.qty}
//                   onChange={(e) => handleItemChange(index, e)}
//                   className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Qty"
//                 />

//                 <input
//                   type="number"
//                   name="price"
//                   value={item.price}
//                   onChange={(e) => handleItemChange(index, e)}
//                   className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Price"
//                 />

//                 <input
//                   type="number"
//                   value={item.total}
//                   readOnly
//                   className="w-1/4 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
//                   placeholder="Total"
//                 />
//               </div>
//             ))}
//             <div className="flex justify-between items-center">
//               <button
//                 onClick={handleAddItem}
//                 className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
//               >
//                 Add Item
//               </button>

//               <div className="bg-indigo-600 px-3 py-2 rounded-md">
//                 <h3 className="font-bold text-base text-white">
//                   Total :{" "}
//                   <span>
//                     {items.reduce((acc, item) => acc + (item.total || 0), 0)}
//                   </span>
//                 </h3>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-4 mt-6">
//             <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none">
//               Save Quotation
//             </button>
//             <button
//               onClick={closeModal}
//               className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuotationForm;

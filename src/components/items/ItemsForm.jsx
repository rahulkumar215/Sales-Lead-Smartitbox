import { useRef, useState } from "react";
import FileUpload from "./FileUpload";
import Button from "../universal/Button";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
function ItemsForm({ onItemsChange, closeModal }) {
  const [items, setItems] = useState([{}]);
  const inputRefs = useRef([]);

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onItemsChange(items);
  };

  const addItem = () => {
    setItems([...items, { category: "", itemName: "", units: "", rate: "" }]);
    setTimeout(() => {
      inputRefs.current[items.length]?.focus();
    }, 0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div
        className="bg-white p-3 m-4 w-[90vw] sm:w-fit rounded-lg shadow-lg max-h-[80vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 rounded-lg w-full mx-auto"
        >
          <h2 className="text-2xl font-semibold text-indigo-600">
            Create Items
          </h2>
          <FileUpload onFileData={setItems}>Import Items from excel</FileUpload>

          <div className="p-1 grid gap-1 mt-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-1 bg-gray-50 rounded-md shadow-sm "
              >
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  placeholder="Category"
                  value={item.category}
                  required
                  onChange={(e) =>
                    handleChange(index, "category", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.itemName}
                  required
                  onChange={(e) =>
                    handleChange(index, "itemName", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Units"
                  value={item.units}
                  required
                  onChange={(e) => handleChange(index, "units", e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  required
                  onChange={(e) => handleChange(index, "rate", e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button
                  onClick={() => removeItem(index)}
                  className="!text-red-600 hover:text-red-800 font-bold !bg-transparent"
                >
                  <IoMdClose size={20} />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4 gap-2 items-center sticky bottom-0 bg-white py-2">
            <button
              type="button"
              className="px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
              onClick={addItem}
            >
              <FaPlus size={16} />
            </button>
            <button
              type="submit"
              className="!bg-indigo-600 text-white px-3 py-1 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="!bg-gray-500 text-white px-3 py-1 rounded-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemsForm;

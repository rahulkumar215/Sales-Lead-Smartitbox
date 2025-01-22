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
    setItems([...items, { category: "", itemName: "" }]);
    setTimeout(() => {
      inputRefs.current[items.length].focus();
    }, 0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-3 w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 rounded-lg w-full mx-auto"
        >
          <h2 className="text-2xl font-semibold text-indigo-600">
            Create Items
          </h2>
          <FileUpload onFileData={setItems}>Import Items from excel</FileUpload>

          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-2 rounded-md shadow-sm mb-2"
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
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Item Name"
                value={item.itemName}
                required
                onChange={(e) =>
                  handleChange(index, "itemName", e.target.value)
                }
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button
                onClick={() => removeItem(index)}
                className="!text-red-600 hover:text-red-800 font-bold !bg-transparent"
              >
                <IoMdClose size={20} />
              </Button>
            </div>
          ))}

          <div className="flex justify-end mt-4 gap-4 items-center sticky bottom-0 bg-white py-2">
            <button
              type="primary"
              className="px-6 py-3 bg-blue-500 text-white"
              onClick={addItem}
            >
              <FaPlus />
            </button>
            <Button
              behaviour="submit"
              className="!bg-indigo-600 text-white px-6 py-2 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Submit
            </Button>
            <Button
              onClick={closeModal}
              className="!bg-gray-500 text-white px-6 py-2 rounded-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemsForm;

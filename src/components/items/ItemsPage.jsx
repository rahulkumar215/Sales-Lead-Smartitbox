import { useState } from "react";
import ItemsForm from "./ItemsForm";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import EditItemForm from "./EditItemForm";

const dummyData = [
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
  {
    id: "it-001",
    category: "na",
    itemName: "Spinner",
  },
];

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Add state and logic for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15; // Adjust this as needed

  const filteredItems = items?.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  // Slice the items based on the current page
  const paginatedItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Calculate the page count
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAddItems = (newItems) => {
    const itemsWithIds = newItems.map((item) => ({
      ...item,
      id: `ITM-${Math.floor(100000 + Math.random() * 900000)}`, // Generate a 6-digit random ID,
      timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }));

    setItems((prev) => [...prev, ...itemsWithIds]);
    setIsModalOpen(false);
    toast.success("Items added successfully!");
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    toast.error("Item deleted successfully!");
  };

  const handleEditItem = (itemId) => {
    setEditItem(items.find((item) => item.id === itemId));
    setIsEditModalOpen(true);
  };

  const saveEditItem = (data) => {
    setItems((prev) => {
      return prev.map((item) => (item.id === data.id ? data : item));
    });
    toast.success("Item udpated successfully!");
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white p-3">
      <ToastContainer />

      {/* Modal Implementation */}
      {isModalOpen && (
        <ItemsForm
          onItemsChange={handleAddItems}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {/* Modal Implementation */}
      {isEditModalOpen && (
        <EditItemForm
          initialItem={editItem}
          onSaveItem={saveEditItem}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 border border-gray-300 bg-gray-100 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-black"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
        >
          <FaPlus />
          Add Items
        </button>
      </div>

      {/* Table Section */}
      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto overflow-x-auto">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-3 py-1 text-left font-medium text-sm">
                Timestamp
              </th>
              <th className="px-3 py-1 text-left font-medium text-sm">
                Category
              </th>
              <th className="px-3 py-1 text-left font-medium text-sm">
                Item Name
              </th>
              <th className="px-3 py-1 text-left font-medium text-sm">Code</th>
              <th className="px-3 py-1 text-left font-medium text-sm">Rate</th>
              <th className="px-3 py-1 text-left font-medium text-sm">Units</th>
              <th className="px-3 py-1 text-left font-medium text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 w-full py-4 text-center text-gray-500"
                >
                  No items found
                </td>
              </tr>
            ) : (
              paginatedItems.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border border-t-gray-300"
                >
                  <td className="px-2 py-1 text-sm">{item.timestamp}</td>
                  <td className="px-2 py-1 text-sm">{item.category}</td>
                  <td className="px-2 py-1 text-sm">{item.itemName}</td>
                  <td className="px-2 py-1 text-sm">{item.id}</td>
                  <td className="px-2 py-1 text-sm">{item.rate}</td>
                  <td className="px-2 py-1 text-sm">{item.units}</td>
                  <td className="px-2 py-1 flex gap-2 items-center justify-center text-sm">
                    <button
                      onClick={() => handleEditItem(item.id)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Optional if needed) */}
      {/* Pagination */}

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-800 font-semibold">
          {filteredItems.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          previousLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Prev
            </span>
          }
          nextLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Next
            </span>
          }
          activeClassName="bg-indigo-600 text-white font-semibold px-2 rounded-sm transition-all"
          disabledClassName="text-gray-400 cursor-not-allowed"
          pageClassName="px-2 rounded-sm  text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all"
          breakClassName="text-gray-600"
        />
      </div>
    </div>
  );
}

export default ItemsPage;

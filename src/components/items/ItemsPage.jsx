import { useState } from "react";
import ItemsForm from "./ItemsForm";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add state and logic for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust this as needed

  const filteredItems = items.filter((item) =>
    [item.itemName, item.category]
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
      id: `ITM-${Math.floor(100000 + Math.random() * 900000)}`, // Generate a 6-digit random ID
    }));

    setItems((prev) => [...prev, ...itemsWithIds]);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-300 p-6">
      <ToastContainer />

      {/* Modal Implementation */}
      {isModalOpen && (
        <ItemsForm
          onItemsChange={handleAddItems}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Add Items
        </button>
      </div>

      {/* Table Section */}
      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Item Id
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Category
              </th>
              <th className="px-6 py-3 text-left font-medium text-sm">
                Item Name
              </th>

              <th className="px-6 py-3 text-left font-medium text-sm">
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
                  <td className="px-3 py-2 text-sm">
                    {new Date().toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-3 py-2 text-sm">{item.id}</td>
                  <td className="px-3 py-2 text-sm">{item.category}</td>
                  <td className="px-3 py-2 text-sm">{item.itemName}</td>
                  <td className="px-3 py-2 flex gap-4 text-sm">
                    <button
                      onClick={() =>
                        alert("Edit functionality not implemented yet")
                      }
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
        <p className="text-sm text-gray-600">
          {filteredItems.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          previousLabel="Prev"
          nextLabel="Next"
          activeClassName="bg-indigo-600 text-white px-2 rounded-md"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default ItemsPage;

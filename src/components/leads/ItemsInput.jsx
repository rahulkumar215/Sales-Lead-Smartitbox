import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function ItemsInput({
  isInterState,
  handleItemChange,
  handleDeleteItem,
  itemList,
  item,
  index,
}) {
  const itemCategories = [...new Set(itemList.map((item) => item.category))];
  const [itemNameList, setItemNameList] = useState([]);

  const handleCategoryChange = (index, e) => {
    handleItemChange(index, e);
    setItemNameList(
      itemList
        .filter((item) => item.category === e.target.value) // Keep only matching items
        .map((item) => ({
          id: item.id,
          name: item.name,
        }))
    );
  };

  const handleNameChange = (index, e) => {
    handleItemChange(index, e);
    const selectedCategory = item.category;
    const selectedName = item.name;
    const newItemDetails = itemList
      .filter(
        (item) =>
          item.category === selectedCategory && item.name === selectedName
      )
      .map(({ id, rate, units }) => ({ id, rate, units }))[0];

    handleItemChange(
      index,
      (e = { target: { name: "id", value: newItemDetails.id } })
    );
    handleItemChange(
      index,
      (e = { target: { name: "units", value: newItemDetails.units } })
    );
    handleItemChange(
      index,
      (e = { target: { name: "rate", value: newItemDetails.rate } })
    );
  };

  return (
    <div
      className={`block sm:grid ${
        isInterState
          ? "grid-cols-[repeat(12,_1fr),_minmax(20px,_max-content)]"
          : "grid-cols-[repeat(13,_1fr),_minmax(20px,_max-content)]"
      } gap-1 mb-1`}
    >
      {/* Category Dropdown */}
      <select
        name="category"
        value={item.category}
        onChange={(e) => handleCategoryChange(index, e)}
        className="w-full   p-1 border rounded-md"
      >
        <option value="">Select Category</option>
        {itemCategories.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Item Name Dropdown */}
      <select
        name="name"
        value={item.name}
        onChange={(e) => handleNameChange(index, e)}
        className="w-full   p-1 border rounded-md"
        disabled={!item.category}
      >
        {item.category &&
          itemNameList.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>

      {/* ID Display */}
      <input
        type="text"
        name="id"
        value={item.id || ""}
        readOnly
        className="w-full outline-none p-1 border bg-gray-100 rounded-md"
      />

      {/* Quantity Input */}
      <input
        type="number"
        name="qty"
        value={item.qty}
        onChange={(e) => handleItemChange(index, e)}
        className="w-full   p-1 border rounded-md"
      />

      {/* Units Display */}
      <input
        type="text"
        name="units"
        value={item.units || ""}
        onChange={(e) => handleItemChange(index, e)}
        className="w-full  p-1 border rounded-md"
      />

      {/* Rate Display */}
      <input
        type="number"
        name="rate"
        value={item.rate || ""}
        onChange={(e) => handleItemChange(index, e)}
        className="w-full   p-1 border rounded-md"
      />

      {/* Subtotal Display */}
      <input
        type="number"
        value={(item.qty * item.rate).toFixed(2)}
        readOnly
        className="w-full outline-none p-1 border bg-gray-100 rounded-md"
      />

      {/* Discount Input */}
      <input
        type="number"
        name="discount"
        value={item.discount}
        onChange={(e) => handleItemChange(index, e)}
        className="w-full  p-1 border rounded-md"
      />

      {/* Taxable Amount Display */}
      <input
        type="number"
        value={(item.qty * item.rate * (1 - item.discount / 100)).toFixed(2)}
        readOnly
        className="w-full outline-none p-1 border bg-gray-100 rounded-md"
      />

      {/* GST Slab Dropdown */}
      <input
        name="gstSlab"
        type="number"
        value={item.gstSlab}
        onChange={(e) => handleItemChange(index, e)}
        className="w-full   p-1 border rounded-md"
      />

      {/* GST Calculations */}
      {isInterState ? (
        <input
          type="number"
          value={(
            item.qty *
            item.rate *
            (1 - item.discount / 100) *
            (item.gstSlab / 100)
          ).toFixed(2)}
          readOnly
          className="w-full outline-none p-1 border bg-gray-100 rounded-md"
        />
      ) : (
        <>
          <input
            type="number"
            value={(
              item.qty *
              item.rate *
              (1 - item.discount / 100) *
              (item.gstSlab / 200)
            ).toFixed(2)}
            readOnly
            className="w-full  outline-none p-1 border bg-gray-100 rounded-md"
          />
          <input
            type="number"
            value={(
              item.qty *
              item.rate *
              (1 - item.discount / 100) *
              (item.gstSlab / 200)
            ).toFixed(2)}
            readOnly
            className="w-full outline-none p-1 border bg-gray-100 rounded-md"
          />
        </>
      )}

      {/* Total Display */}
      <input
        type="number"
        value={(
          item.qty *
          item.rate *
          (1 - item.discount / 100) *
          (1 + (isInterState ? item.gstSlab / 100 : item.gstSlab / 100))
        ).toFixed(2)}
        readOnly
        className="w-full  p-1 border bg-gray-100 rounded-md"
      />

      {/* Delete Button */}
      <button
        onClick={() => handleDeleteItem(index)}
        type="button"
        className="py-1 px-2 sm:p-0 flex w-full sm:w-fit items-center justify-center gap-2 bg-red-600 sm:bg-transparent sm:text-red-600 rounded-md sm:hover:text-red-700 focus:outline-none"
      >
        <FaTrashAlt size={20} className=" text-white sm:text-inherit" />
        <span className=" text-white sm:hidden">Delete</span>
      </button>
    </div>
  );
}

export default ItemsInput;

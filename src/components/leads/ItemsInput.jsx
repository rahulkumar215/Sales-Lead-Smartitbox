import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Update item name list whenever the category or item list changes
    const selectedCategory = item.category;
    setItemNameList(
      itemList
        .filter((item) => item.category === selectedCategory) // Assuming selectedCategory is the current category
        .map((item) => ({
          id: item.id,
          name: item.name,
        }))
    );
  }, [item, itemList]);

  useEffect(() => {
    if (itemList.length > 0 && item.category && item.name) {
      const selectedCategory = item.category;
      const selectedName = item.name;
      const newItemDetails = itemList.find(
        (item) =>
          item.category === selectedCategory && item.name === selectedName
      );

      if (newItemDetails) {
        handleItemChange(index, {
          target: { name: "id", value: newItemDetails.id },
        });
        handleItemChange(index, {
          target: { name: "units", value: newItemDetails.units },
        });
        handleItemChange(index, {
          target: { name: "rate", value: newItemDetails.rate },
        });
      }
    }
  }, [JSON.stringify(item), itemList]);

  return (
    <div
      className={`grid text-sm sm:grid-cols-[repeat(14,_1fr),_minmax(20px,_max-content)] gap-1 mb-1`}
    >
      <p className="w-full sm:hidden text-center py-1 bg-gray-300 rounded-md">
        Item : {index + 1}
      </p>
      {/* Category Dropdown */}
      <select
        name="category"
        value={item.category}
        onChange={(e) => handleItemChange(index, e)}
        className="w-full   p-1 border rounded-md"
      >
        <option value="" disabled>
          Select Category
        </option>
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
        onChange={(e) => handleItemChange(index, e)}
        className="w-full   p-1 border rounded-md"
        disabled={!item.category}
      >
        <option value="" disabled>
          Select Item
        </option>
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
        placeholder="Id"
        className="w-full outline-none p-1 border bg-gray-100 rounded-md"
      />
      {/* Quantity Input */}
      <input
        type="number"
        name="qty"
        value={item.qty}
        placeholder="Qty"
        onChange={(e) => handleItemChange(index, e)}
        className="w-full   p-1 border rounded-md"
      />
      {/* Units Display */}
      <input
        type="text"
        name="units"
        placeholder="Units"
        value={item.units || ""}
        readOnly
        onChange={(e) => handleItemChange(index, e)}
        className="w-full bg-gray-100 outline-none p-1 border rounded-md"
      />
      {/* Rate Display */}
      <input
        type="number"
        name="rate"
        placeholder="Rate"
        value={item.rate || ""}
        readOnly
        onChange={(e) => handleItemChange(index, e)}
        className="w-full  bg-gray-100 outline-none p-1 border rounded-md"
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
        placeholder="Discount"
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
        placeholder="Tax %"
        onChange={(e) => handleItemChange(index, e)}
        className="w-full   p-1 border rounded-md"
      />
      {/* GST Calculations */}
      <input
        type="number"
        value={
          isInterState
            ? (
                item.qty *
                item.rate *
                (1 - item.discount / 100) *
                (item.gstSlab / 100)
              ).toFixed(2)
            : "0.00"
        }
        readOnly
        className="w-full outline-none p-1 border bg-gray-100 rounded-md"
      />
      <>
        <input
          type="number"
          value={
            isInterState
              ? "0.00"
              : (
                  item.qty *
                  item.rate *
                  (1 - item.discount / 100) *
                  (item.gstSlab / 200)
                ).toFixed(2)
          }
          readOnly
          className="w-full  outline-none p-1 border bg-gray-100 rounded-md"
        />
        <input
          type="number"
          value={
            isInterState
              ? "0.00"
              : (
                  item.qty *
                  item.rate *
                  (1 - item.discount / 100) *
                  (item.gstSlab / 200)
                ).toFixed(2)
          }
          readOnly
          className="w-full outline-none p-1 border bg-gray-100 rounded-md"
        />
      </>
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

import { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import ItemsInput from "./ItemsInput";

const newItem = {
  category: "",
  name: "",
  id: "",
  units: "",
  qty: "",
  rate: "",
  discount: "",
  gstSlab: "",
  subtotal: "",
};

function QuotationForm({ items, setItems }) {
  const [itemList, setItemList] = useState([]);
  const [isInterState, setIsInterState] = useState(true);
  const { randomUUID } = new ShortUniqueId({ length: 4 });

  const handleAddItem = () => {
    setItems([...items, newItem]);
  };

  console.log(items);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    console.log(index, name, value);
    const updatedItems = [...items];
    updatedItems[index][name] = value;

    if (name === "qty" || name === "rate") {
      updatedItems[index].subtotal =
        Number(updatedItems[index].qty) * Number(updatedItems[index].rate);
    }

    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://679a84d8747b09cdcccf1987.mockapi.io/app/items"
        );
        const data = await res.json();
        setItemList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="mb-6 mt-2">
      <h3 className="text-xl font-semibold text-red-600 mb-2">
        Items Description
      </h3>

      {/* Labels for all inputs */}
      <div
        className={`hidden text-sm sm:grid grid-rows-1 ${
          isInterState
            ? "grid-cols-[repeat(12,_1fr),_minmax(20px,_max-content)]"
            : "grid-cols-[repeat(13,_1fr),_minmax(20px,_max-content)]"
        } gap-1 mb-2 text-gray-700 bg-blue-200 rounded-md font-medium`}
      >
        <span className="w-full pl-1">
          Category <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Item Name <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Id <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Qty. <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Units <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Rate <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Subtotal <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Discount (%) <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          Taxable Amount <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full">
          GST Slab <span className="text-red-600 text-lg">*</span>
        </span>
        {isInterState ? (
          <span className="w-full">
            IGST <span className="text-red-600 text-lg">*</span>
          </span>
        ) : (
          <>
            <span className="w-full">
              SGST <span className="text-red-600 text-lg">*</span>
            </span>
            <span className="w-full">
              CGST <span className="text-red-600 text-lg">*</span>
            </span>
          </>
        )}
        <span className="w-full">
          Total <span className="text-red-600 text-lg">*</span>
        </span>
        <span className="w-full h-0">&nbsp;</span>
      </div>

      {/* Dynamic Input Rows */}
      {items.map((item, index) => (
        <ItemsInput
          key={index}
          isInterState={isInterState}
          handleItemChange={handleItemChange}
          handleDeleteItem={handleDeleteItem}
          itemList={itemList}
          item={item}
          index={index}
        />
      ))}

      {/* Add Item Button and Total Summary */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleAddItem}
          type="button"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
        >
          Add Item
        </button>

        {/* Total Summary Section */}
        <div className="border mt-4  rounded-lg  ">
          <table className="w-full border-collapse ">
            <tbody>
              <tr className="border border-blue-300">
                <td className="px-3 py-1 font-semibold border-r border-blue-300 bg-blue-200">
                  Total Amount
                </td>
                <td className="px-3 py-1 bg-gray-100 font-semibold text-left">
                  {items
                    .reduce(
                      (acc, item) =>
                        acc + item.qty * item.rate * (1 - item.discount / 100),
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
              {isInterState ? (
                <tr className="border border-blue-300">
                  <td className="px-3 py-1 font-semibold border-r border-blue-300 bg-blue-200">
                    IGST Total
                  </td>
                  <td className="px-3 py-1 bg-gray-100 font-semibold text-left">
                    {items
                      .reduce((acc, item) => {
                        const taxable =
                          item.qty * item.rate * (1 - item.discount / 100);
                        return acc + (taxable * item.gstSlab) / 100;
                      }, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              ) : (
                <>
                  <tr className="border border-blue-300">
                    <td className="px-3 py-1 font-semibold border-r border-blue-300 bg-blue-200">
                      SGST Total
                    </td>
                    <td className="px-3 py-1 bg-gray-100 font-semibold text-left">
                      {items
                        .reduce((acc, item) => {
                          const taxable =
                            item.qty * item.rate * (1 - item.discount / 100);
                          return acc + (taxable * item.gstSlab) / 200;
                        }, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border border-blue-300">
                    <td className="px-3 py-1 font-semibold border-r border-blue-300 bg-blue-200">
                      CGST Total
                    </td>
                    <td className="px-3 py-1 bg-gray-100 font-semibold text-left">
                      {items
                        .reduce((acc, item) => {
                          const taxable =
                            item.qty * item.rate * (1 - item.discount / 100);
                          return acc + (taxable * item.gstSlab) / 200;
                        }, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </>
              )}

              <tr className="border border-blue-300">
                <td className="px-3 py-1 font-semibold border-r border-blue-300 bg-blue-200">
                  Grand Total
                </td>
                <td className="px-3 py-1 bg-gray-100 font-semibold text-left">
                  {items
                    .reduce((acc, item) => {
                      const taxable =
                        item.qty * item.rate * (1 - item.discount / 100);
                      return acc + taxable * (1 + item.gstSlab / 100);
                    }, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuotationForm;

import PivotTable from "./PivotTable";
import { FaEdit, FaHistory } from "react-icons/fa";

function LeadExpandableTable({
  contentRefs,
  index,
  expandedRow,
  lead,
  showFollowUpHistory,
  setIsTakeFollowUpModalOpen,
  setLeadFollowUpHistory,
}) {
  return (
    <tr>
      <td colSpan="16">
        <div
          ref={(el) => (contentRefs.current[index] = el)}
          className={`overflow-hidden overflow-x-auto transition-[max-height] duration-500 ease-in-out ${
            expandedRow === index ? "max-h-screen" : "max-h-0"
          }`}
          style={{
            maxHeight:
              expandedRow === index
                ? contentRefs.current[index]?.scrollHeight + "px"
                : "0px",
          }}
        >
          <div className="p-4 bg-slate-200 shadow-md rounded-lg flex">
            {/* Lead Details Section */}
            <div className="w-3/12 pr-4">
              <h3 className="text-lg text-indigo-700 font-semibold mb-3">
                Lead Details
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <p>
                  <strong>Address:</strong> {lead.leadDetails.address}
                </p>
                <p>
                  <strong>Country:</strong> {lead.leadDetails.country}
                </p>
                <p>
                  <strong>State:</strong> {lead.leadDetails.state}
                </p>
                <p>
                  <strong>City:</strong> {lead.leadDetails.city}
                </p>
                <p>
                  <strong>Industry Type:</strong>{" "}
                  {lead.leadDetails.industryType}
                </p>
                <p>
                  <strong>GST No.:</strong> {lead.leadDetails.gst}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    className="bg-teal-600 flex gap-2 justify-center items-center hover:bg-teal-700 py-2 px-4 rounded-md text-white "
                    onClick={() => showFollowUpHistory(lead.leadDetails.leadId)}
                  >
                    <FaHistory size={20} />
                    Follow Up History
                  </button>
                  <button
                    className="bg-red-600 flex gap-2 justify-center items-center hover:bg-red-700 py-2 px-4 rounded-md text-white"
                    onClick={() => {
                      setIsTakeFollowUpModalOpen(true);
                      setLeadFollowUpHistory(lead.leadDetails.leadId);
                    }}
                  >
                    <FaEdit size={20} />
                    Take Follow Up
                  </button>
                </div>
              </div>
            </div>

            {/* Item Details Section */}
            <div className="w-9/12">
              <h4 className="text-lg text-indigo-600 font-medium mb-3">
                Item Details
              </h4>
              <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-blue-200">
                  <tr>
                    {[
                      "Category",
                      "Name",
                      "Id",
                      "Qty.",
                      "Rate",
                      "Subtotal",
                      "Discount",
                      "Taxable Amount",
                      "GST Slab",
                      "IGST",
                      "SGST",
                      "CGST",
                      "Total",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-2 py-1 border border-gray-300 text-left text-sm font-medium text-gray-600"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lead.itemDetails.length === 0 ? (
                    <tr className=" text-center">
                      <td colSpan={16}>Items are not added for this lead.</td>
                    </tr>
                  ) : (
                    lead.itemDetails.map((item, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          {item.category}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          {item.name}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          {item.id}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          {parseFloat(item.qty).toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          ₹{parseFloat(item.rate).toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          ₹{parseFloat(item.qty * item.rate).toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          {item.discount}%
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          ₹
                          {parseFloat(
                            item.qty * item.rate * (1 - item.discount / 100)
                          ).toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          {item.gstSlab}%
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          ₹
                          {lead.leadDetails.interState
                            ? parseFloat(
                                item.qty *
                                  item.rate *
                                  (1 - item.discount / 100) *
                                  (item.gstSlab / 100)
                              ).toFixed(2)
                            : "0.00"}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          ₹
                          {lead.leadDetails.interState
                            ? "0.00"
                            : parseFloat(
                                item.qty *
                                  item.rate *
                                  (1 - item.discount / 100) *
                                  (item.gstSlab / 200)
                              ).toFixed(2)}
                        </td>
                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          ₹
                          {lead.leadDetails.interState
                            ? "0.00"
                            : parseFloat(
                                item.qty *
                                  item.rate *
                                  (1 - item.discount / 100) *
                                  (item.gstSlab / 200)
                              ).toFixed(2)}
                        </td>

                        <td className="px-2 py-1 border border-gray-300 text-sm">
                          ₹
                          {parseFloat(
                            item.qty *
                              item.rate *
                              (1 - item.discount / 100) *
                              (1 +
                                (lead.leadDetails.interState
                                  ? item.gstSlab / 100
                                  : item.gstSlab / 100))
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {lead.itemDetails.length > 0 && (
                  <tfoot className="">
                    <tr>
                      <td colSpan={12}>
                        <PivotTable
                          items={lead.itemDetails}
                          isInterState={lead.leadDetails.interState}
                          className="max-w-[30rem] sm:w-fit border border-gray-400"
                        />
                      </td>
                      <td>
                        <tr className="text-red-600">
                          <td
                            colSpan={12}
                            className="px-1 text-right font-semibold"
                          >
                            Total Amount
                          </td>
                          <td className="px-1 font-semibold">
                            ₹
                            {lead.itemDetails
                              .reduce(
                                (acc, item) =>
                                  acc +
                                  item.qty *
                                    item.rate *
                                    (1 - item.discount / 100),
                                0
                              )
                              .toFixed(2)}
                          </td>
                        </tr>
                        <tr className="text-red-600">
                          <td
                            colSpan={12}
                            className="px-1 text-right font-semibold"
                          >
                            IGST
                          </td>
                          <td className="px-1 font-semibold">
                            ₹
                            {lead.leadDetails.interState
                              ? lead.itemDetails
                                  .reduce((acc, item) => {
                                    const taxable =
                                      item.qty *
                                      item.rate *
                                      (1 - item.discount / 100);
                                    return acc + (taxable * item.gstSlab) / 100;
                                  }, 0)
                                  .toFixed(2)
                              : "0.00"}
                          </td>
                        </tr>
                        <tr className="text-red-600">
                          <td
                            colSpan={12}
                            className="px-1 text-right font-semibold"
                          >
                            SGST
                          </td>
                          <td className="px-1 font-semibold">
                            ₹
                            {lead.leadDetails.interState
                              ? "0.00"
                              : lead.itemDetails
                                  .reduce((acc, item) => {
                                    const taxable =
                                      item.qty *
                                      item.rate *
                                      (1 - item.discount / 100);
                                    return acc + (taxable * item.gstSlab) / 200;
                                  }, 0)
                                  .toFixed(2)}
                          </td>
                        </tr>
                        <tr className="text-red-600">
                          <td
                            colSpan={12}
                            className="px-1 text-right font-semibold"
                          >
                            CGST
                          </td>
                          <td className="px-1 font-semibold">
                            ₹
                            {lead.leadDetails.interState
                              ? "0.00"
                              : lead.itemDetails
                                  .reduce((acc, item) => {
                                    const taxable =
                                      item.qty *
                                      item.rate *
                                      (1 - item.discount / 100);
                                    return acc + (taxable * item.gstSlab) / 200;
                                  }, 0)
                                  .toFixed(2)}
                          </td>
                        </tr>
                        <tr className="text-red-600">
                          <td
                            colSpan={12}
                            className="px-1 text-right font-semibold"
                          >
                            Grand Total
                          </td>
                          <td className="px-1 font-semibold">
                            ₹
                            {lead.itemDetails
                              .reduce((acc, item) => {
                                const taxable =
                                  item.qty *
                                  item.rate *
                                  (1 - item.discount / 100);
                                return acc + taxable * (1 + item.gstSlab / 100);
                              }, 0)
                              .toFixed(2)}
                          </td>
                        </tr>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default LeadExpandableTable;

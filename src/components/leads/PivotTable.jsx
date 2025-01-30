const PivotTable = ({ items, isInterState = "", className = "" }) => {
  // Aggregate data by GST Slab
  const pivotData = items.reduce((acc, item) => {
    const taxableAmount = item.qty * item.rate * (1 - item.discount / 100);
    const gstSlab = item.gstSlab || 0;
    const igst = isInterState ? taxableAmount * (gstSlab / 100) : 0;
    const sgst = isInterState ? 0 : taxableAmount * (gstSlab / 200);
    const cgst = isInterState ? 0 : taxableAmount * (gstSlab / 200);

    if (!acc[gstSlab]) {
      acc[gstSlab] = { gstSlab, igst: 0, sgst: 0, cgst: 0 };
    }

    acc[gstSlab].igst += igst;
    acc[gstSlab].sgst += sgst;
    acc[gstSlab].cgst += cgst;

    return acc;
  }, {});

  // Convert object to array for rendering
  const pivotArray = Object.values(pivotData);

  return (
    <div className={`overflow-auto mt-4 w-full sm:w-fit ${className}`}>
      <table className="w-full sm:w-96 border-collapse text-center border border-gray-300">
        <thead>
          <tr className="bg-blue-200 text-gray-600 font-normal">
            <th className="border px-2 py-0.5">GST Slab</th>
            <th className="border px-2 py-0.5">IGST</th>
            <th className="border px-2 py-0.5">SGST</th>
            <th className="border px-2 py-0.5">CGST</th>
          </tr>
        </thead>
        <tbody>
          {pivotArray.map(({ gstSlab, igst, sgst, cgst }) => (
            <tr key={gstSlab}>
              <td className="border px-2 py-0.5">{gstSlab}%</td>
              <td className="border px-2 py-0.5">₹{igst.toFixed(2)}</td>
              <td className="border px-2 py-0.5">₹{sgst.toFixed(2)}</td>
              <td className="border px-2 py-0.5">₹{cgst.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PivotTable;

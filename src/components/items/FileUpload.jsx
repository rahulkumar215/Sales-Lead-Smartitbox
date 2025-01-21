import { useState } from "react";
import * as XLSX from "xlsx";
import Button from "../universal/Button";

// eslint-disable-next-line react/prop-types
const FileUpload = ({ children, onFileData }) => {
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState("");

  const handleDownload = () => {
    // Sample data
    const sampleData = [
      ["Item Name", "Category"], // Header row
      ["Design Charge", "na"], // Row 1
      ["Solvent Normal flex", "Flex"], // Row 2
      ["Solvent Oneway Vision", "na"], // Row 3
    ];

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Data");

    // Write the workbook and trigger download
    XLSX.writeFile(workbook, "items_sample_data.xlsx");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFileName("No file chosen");
      setError("");
      return;
    }

    const validMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!validMimeTypes.includes(file.type)) {
      setFileName("Invalid file type");
      setError("Please upload a valid Excel file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Check if the first row contains valid headers
      if (jsonData[0] && jsonData[0].length !== 2) {
        setError("The uploaded Excel file must contain exactly two columns.");
        setFileName(file.name);
        return;
      }

      // Process data and skip the first row (header row)
      const processedData = jsonData.slice(1).map((row) => {
        return {
          itemName: row[0] || "", // Ensure itemName is populated
          category: row[1] || "", // Ensure category is populated
        };
      });

      // Validate the processed data structure
      const invalidRows = processedData.some(
        (row) =>
          typeof row.itemName !== "string" || typeof row.category !== "string"
      );

      if (invalidRows) {
        setError(
          "Invalid data format in file. Please ensure the file has two valid columns."
        );
        setFileName(file.name);
      } else {
        // Pass the processed data to the parent component
        onFileData(processedData);
        setFileName(file.name);
        setError("");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="h-fit text-[1rem]">
      <h4 className="mb-4 text-black">{children}</h4>
      <div className="flex w-full flex-col gap-2 rounded border border-black border-opacity-50 p-4">
        <div className="flex items-center gap-4">
          <label className="cursor-pointer rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">
            Choose File
            <input
              type="file"
              className="hidden"
              accept=".xls,.xlsx"
              onChange={handleFileChange}
            />
          </label>
          <span className="text-gray-600">{fileName}</span>
          <Button
            className="!bg-green-700 hover:!bg-green-800 px-2 py-1 !rounded-sm"
            onClick={handleDownload}
          >
            Sample Data
          </Button>
        </div>
        {error && <p className=" text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FileUpload;

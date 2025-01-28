import { useState } from "react";
import * as XLSX from "xlsx";
import Button from "../universal/Button";

// eslint-disable-next-line react/prop-types
const FileUpload = ({ children, onFileData }) => {
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState("");

  const handleDownload = () => {
    // Sample data with the new fields
    const sampleData = [
      [
        "Company Name",
        "Address",
        "GST",
        "Country",
        "State",
        "City",
        "Industry Type",
        "Contact Person",
        "Number",
        "Email",
        "Designation",
      ], // Header row
      [
        "ABC Corp",
        "123 Main St",
        "22AAAAA0000A1Z5",
        "India",
        "Maharashtra",
        "Mumbai",
        "IT",
        "John Doe",
        "9876543210",
        "john@example.com",
        "Manager",
      ], // Row 1
      [
        "XYZ Ltd",
        "456 Elm St",
        "27BBBBB1111B2Z6",
        "India",
        "Karnataka",
        "Bangalore",
        "Manufacturing",
        "Jane Smith",
        "8765432109",
        "jane@example.com",
        "CEO",
      ], // Row 2
    ];

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Data");

    // Write the workbook and trigger download
    XLSX.writeFile(workbook, "companies_sample_data.xlsx");
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
      const expectedHeaders = [
        "Company Name",
        "Address",
        "GST",
        "Country",
        "State",
        "City",
        "Industry Type",
        "Contact Person",
        "Number",
        "Email",
        "Designation",
      ];
      const headersMatch =
        JSON.stringify(jsonData[0]) === JSON.stringify(expectedHeaders);

      if (!headersMatch) {
        setError(
          `The uploaded Excel file must contain the following headers: ${expectedHeaders.join(
            ", "
          )}`
        );
        setFileName(file.name);
        return;
      }

      // Process data and skip the first row (header row)
      const processedData = jsonData.slice(1).map((row) => {
        return {
          companyName: row[0] || "",
          address: row[1] || "",
          gst: row[2] || "",
          country: row[3] || "",
          state: row[4] || "",
          city: row[5] || "",
          industryType: row[6] || "",
          contactPerson: row[7] || "",
          number: row[8] || "",
          email: row[9] || "",
          designation: row[10] || "",
        };
      });

      // Validate the processed data structure
      const invalidRows = processedData.some((row) =>
        Object.values(row).some(
          (value) => typeof value !== "string" && typeof value !== "number"
        )
      );

      if (invalidRows) {
        setError(
          "Invalid data format in file. Please ensure all columns have valid data."
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
    <div className="h-fit text-[1rem] mb-2">
      <h4 className="mb-2 text-black">{children}</h4>
      <div className="flex flex-wrap w-full sm:w-fit flex-col gap-2 rounded border border-black border-opacity-50 p-2">
        <div className="flex flex-wrap items-center gap-4">
          <label className="cursor-pointer rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">
            Upload
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
            Format
          </Button>
        </div>
        {error && <p className=" text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FileUpload;

import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (
  customerDetails,
  itemDetails,
  user = "Rahul",
  quoteId = "Q/24-25/001"
) => {
  const doc = new jsPDF();

  // Add Logo to the top-right corner
  const img = new Image();
  img.src = "src/assets/img/logo.jpeg";
  img.onload = () => {
    doc.addImage(img, "JPEG", 140, 10, 60, 20);
    generateContent();
  };

  const generateContent = () => {
    // Add Title (Big and Bold)
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Quotation", 14, 20);

    // Quotation No: Red and Bold
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 0); // Red color
    doc.text(`Quotation no : ${quoteId}`, 14, 30);

    // Quotation Date
    doc.setTextColor(0, 0, 0); // Reset color to black
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Quotation date : ${new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })}`,
      14,
      35
    );

    // Add "From" section on the left side (half the width of the page)
    const fromTitleY = 45; // Y position for the "From:" label
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("From:", 14, fromTitleY);

    // Company Address under "From:" (Company name is bold)
    const companyAddress = "SAI Advertising Service";
    const companyAddress1 = "Plot no 148, Press Site,";
    const companyAddress2 = "Industrial Area Phase 1,";
    const companyAddress3 = "Chandigarh, 160001";
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(companyAddress, 14, fromTitleY + 7);
    doc.setFont("helvetica", "normal");
    doc.text(companyAddress1, 14, fromTitleY + 14);
    doc.text(companyAddress2, 14, fromTitleY + 21);
    doc.text(companyAddress3, 14, fromTitleY + 28);

    // Add "To:" section on the right side (half the width of the page)
    const toTitleY = 45; // Same Y position as "From"
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("To:", 105, toTitleY); // Positioned at the center (X = 105)

    // Customer Details under "To:"
    const customerDetailsY = toTitleY + 7;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setFont("helvetica", "bold");
    doc.text(` ${customerDetails.name}`, 105, customerDetailsY);
    doc.setFont("helvetica", "normal");
    doc.text(` ${customerDetails.address}`, 105, customerDetailsY + 7);
    doc.text(
      ` ${customerDetails.country}, ${customerDetails.state}, ${customerDetails.city}`,
      105,
      customerDetailsY + 14
    );
    doc.text(
      ` ${customerDetails.contactPerson}, ${customerDetails.number}, ${customerDetails.email}`,
      105,
      customerDetailsY + 21
    );

    // Divider between item details and total
    const dividerY = 70; // Position for the divider line

    // Prepare item data for table
    const itemData = itemDetails.map((item, i) => [
      i + 1,
      item.category,
      item.name,
      parseFloat(item.qty).toFixed(2),
      parseFloat(item.price).toFixed(2),
      parseFloat(item.total).toFixed(2),
    ]);

    // Add Item Details Table with light borders
    doc.autoTable({
      startY: dividerY + 10,
      head: [["S. No.", "Category", "Name", "Quantity", "Price", "Total"]],
      body: itemData,
      headStyles: {
        fillColor: [200, 220, 255], // Light color for the table header
        textColor: [0, 0, 0], // Black text for headers
        fontSize: 10,
      },
      styles: {
        fontSize: 10,
        cellPadding: 2,
        valign: "middle",
        lineWidth: 0.3, // Light border width
        lineColor: [200, 200, 200], // Light gray border color
      },
    });

    // Add Quotation Total at the bottom-right corner (Red and Bold)
    const total = itemDetails.reduce((acc, item) => acc + item.total, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 0); // Red color
    doc.text(`Total: ${total.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 10); // Positioned at the bottom-right

    // Add Authorized Signatory at the bottom-right corner
    const signatoryY = doc.lastAutoTable.finalY + 40; // Positioning after the total amount
    const signatoryX = 130; // Align to the right (X position)
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signatory:", signatoryX, signatoryY);
    doc.text("__________________________", signatoryX, signatoryY + 7);
    doc.text(`${user}`, signatoryX, signatoryY + 14); // Using the `user` as the signatory name

    // Save PDF
    doc.save("quotation.pdf");
  };
};

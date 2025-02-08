import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePIPDF = (
  customerDetails,
  itemDetails,
  user = "Rahul",
  quoteId = "PI/24-25/001"
) => {
  const doc = new jsPDF("l");

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
    doc.text("Proforma Invoice", 14, 20);

    // Quotation No: Red and Bold
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 0); // Red color
    doc.text(`Invoice No : ${quoteId}`, 14, 30);

    // Quotation Date
    doc.setTextColor(0, 0, 0); // Reset color to black
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Date : ${new Date().toLocaleDateString("en-IN", {
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
    doc.setFontSize(10);
    doc.text(companyAddress1, 14, fromTitleY + 12);
    doc.text(companyAddress2, 14, fromTitleY + 16);
    doc.text(companyAddress3, 14, fromTitleY + 20);
    doc.setFontSize(11);
    doc.text("GSTIN : ABCD415236541", 14, fromTitleY + 25);

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
    doc.setFontSize(10);
    doc.text(` ${customerDetails.address}`, 105, customerDetailsY + 5);
    doc.text(
      ` ${customerDetails.country}, ${customerDetails.state}, ${customerDetails.city}`,
      105,
      customerDetailsY + 9
    );
    doc.text(
      ` ${customerDetails.contactPerson}, ${customerDetails.number}, ${customerDetails.email}`,
      105,
      customerDetailsY + 13
    );

    // Divider between item details and total
    // const dividerY = 70; // Position for the divider line

    // Prepare item data for table
    let totalTaxable = 0,
      totalIGST = 0,
      totalSGST = 0,
      totalCGST = 0;
    const gstSummary = {};

    const itemData = itemDetails.map((item, i) => {
      const subtotal = item.rate * item.qty;
      const taxableAmount = subtotal - item.discount;
      const igst = customerDetails.interState
        ? taxableAmount * (item.gstSlab / 100)
        : 0;
      const sgst = customerDetails.interState
        ? 0
        : taxableAmount * (item.gstSlab / 200);
      const cgst = customerDetails.interState
        ? 0
        : taxableAmount * (item.gstSlab / 200);
      const total = taxableAmount + igst + sgst + cgst;

      totalTaxable += taxableAmount;
      totalIGST += igst;
      totalSGST += sgst;
      totalCGST += cgst;

      gstSummary[item.gstSlab] = gstSummary[item.gstSlab] || {
        IGST: 0,
        SGST: 0,
        CGST: 0,
      };
      gstSummary[item.gstSlab].IGST += igst;
      gstSummary[item.gstSlab].SGST += sgst;
      gstSummary[item.gstSlab].CGST += cgst;

      return [
        i + 1,
        item.category,
        item.name,
        item.id,
        item.units,
        item.rate.toFixed(2),
        subtotal.toFixed(2),
        item.discount,
        taxableAmount.toFixed(2),
        item.gstSlab,
        igst.toFixed(2),
        sgst.toFixed(2),
        cgst.toFixed(2),
        total.toFixed(2),
      ];
    });

    doc.autoTable({
      startY: 80,
      head: [
        [
          "S. No.",
          "Category",
          "Item Name",
          "Id",
          "Units",
          "Rate",
          "Subtotal",
          "Discount",
          "Taxable Amount",
          "GST Slab",
          "IGST",
          "SGST",
          "CGST",
          "Total",
        ],
      ],
      body: itemData,
      styles: { fontSize: 10, cellPadding: 2, valign: "middle" },
    });

    const summaryY = doc.lastAutoTable.finalY + 10;

    if (summaryY + 80 > 280) {
      doc.addPage("", "l");
    }

    // GST Summary Table
    doc.autoTable({
      startY: summaryY,
      head: [["GST Slab", "IGST", "SGST", "CGST"]],
      body: Object.entries(gstSummary).map(([slab, values]) => [
        `${slab}%`,
        values.IGST.toFixed(2),
        values.SGST.toFixed(2),
        values.CGST.toFixed(2),
      ]),
      styles: { fontSize: 10 },
    });

    const y = doc.lastAutoTable.finalY + 10;

    if (y + 80 > 280) {
      doc.addPage("", "l");
    }

    doc.setTextColor(255, 0, 0); // Red color
    // Summary Section
    doc.text(`Total Amount : ${totalTaxable.toFixed(2)}`, 230, y);
    doc.text(`IGST             : ${totalIGST.toFixed(2)}`, 230, y + 5);
    doc.text(`SGST           : ${totalSGST.toFixed(2)}`, 230, y + 10);
    doc.text(`CGST           : ${totalCGST.toFixed(2)}`, 230, y + 15);
    doc.text(
      `Grand Total  : ${(
        totalTaxable +
        totalIGST +
        totalSGST +
        totalCGST
      ).toFixed(2)}`,
      230,
      y + 20
    );

    // Add Authorized Signatory at the bottom-right corner
    const signatoryY = doc.lastAutoTable.finalY + 50; // Positioning after the total amount

    if (signatoryY + 80 > 280) {
      doc.addPage("", "l");
    }

    const signatoryX = 220; // Align to the right (X position)
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signatory:", signatoryX, signatoryY);
    doc.text("__________________________", signatoryX, signatoryY + 7);
    doc.text(`${user}`, signatoryX, signatoryY + 14); // Using the `user` as the signatory name

    // Save PDF
    doc.save("proformaiinvoice.pdf");
  };
};

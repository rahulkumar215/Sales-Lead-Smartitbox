import { useState } from "react";
import QuotationForm from "./QuotationForm";
import { FaEdit, FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";

function QuotationPage() {
  const [quotations, setQuotations] = useState([
    {
      leadId: "140080",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0033",
      clientName: "Client_36",
      contactPerson: "Neha",
      email: "user46@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "6406",
      pdfUrl: "http://example.com/pdf/33.pdf",
    },
    {
      leadId: "133007",
      leadSource: "LinkedIn",
      quotationNo: "SMT/24-25/0034",
      clientName: "Client_70",
      contactPerson: "Priya",
      email: "user100@example.com",
      assignedTo: "Rahul",
      createdBy: "Amit",
      amount: "3781",
      pdfUrl: "http://example.com/pdf/34.pdf",
    },
    {
      leadId: "232144",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0035",
      clientName: "Client_22",
      contactPerson: "Vikram",
      email: "user85@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "2274",
      pdfUrl: "http://example.com/pdf/35.pdf",
    },
    {
      leadId: "995265",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0036",
      clientName: "Client_28",
      contactPerson: "Suman",
      email: "user26@example.com",
      assignedTo: "Amit",
      createdBy: "Neha",
      amount: "5670",
      pdfUrl: "http://example.com/pdf/36.pdf",
    },
    {
      leadId: "405105",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0037",
      clientName: "Client_26",
      contactPerson: "Amit",
      email: "user68@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "9621",
      pdfUrl: "http://example.com/pdf/37.pdf",
    },
    {
      leadId: "672257",
      leadSource: "LinkedIn",
      quotationNo: "SMT/24-25/0038",
      clientName: "Client_45",
      contactPerson: "Neha",
      email: "user77@example.com",
      assignedTo: "Neha",
      createdBy: "Neha",
      amount: "7809",
      pdfUrl: "http://example.com/pdf/38.pdf",
    },
    {
      leadId: "959865",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0039",
      clientName: "Client_30",
      contactPerson: "Neha",
      email: "user79@example.com",
      assignedTo: "Rahul",
      createdBy: "Neha",
      amount: "2115",
      pdfUrl: "http://example.com/pdf/39.pdf",
    },
    {
      leadId: "972464",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0040",
      clientName: "Client_56",
      contactPerson: "Sara",
      email: "user3@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "6704",
      pdfUrl: "http://example.com/pdf/40.pdf",
    },
    {
      leadId: "278630",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0041",
      clientName: "Client_31",
      contactPerson: "Neha",
      email: "user92@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "4402",
      pdfUrl: "http://example.com/pdf/41.pdf",
    },
    {
      leadId: "727563",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0042",
      clientName: "Client_8",
      contactPerson: "Vikram",
      email: "user10@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "5275",
      pdfUrl: "http://example.com/pdf/42.pdf",
    },
    {
      leadId: "334734",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0043",
      clientName: "Client_7",
      contactPerson: "Vikram",
      email: "user24@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "6742",
      pdfUrl: "http://example.com/pdf/43.pdf",
    },
    {
      leadId: "388560",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0044",
      clientName: "Client_39",
      contactPerson: "Neha",
      email: "user1@example.com",
      assignedTo: "Rahul",
      createdBy: "Amit",
      amount: "5296",
      pdfUrl: "http://example.com/pdf/44.pdf",
    },
    {
      leadId: "554807",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0045",
      clientName: "Client_90",
      contactPerson: "Sara",
      email: "user34@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "7364",
      pdfUrl: "http://example.com/pdf/45.pdf",
    },
    {
      leadId: "275277",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0046",
      clientName: "Client_13",
      contactPerson: "Kunal",
      email: "user28@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "9899",
      pdfUrl: "http://example.com/pdf/46.pdf",
    },
    {
      leadId: "838258",
      leadSource: "Google Ads",
      quotationNo: "SMT/24-25/0047",
      clientName: "Client_66",
      contactPerson: "Vikram",
      email: "user17@example.com",
      assignedTo: "Rahul",
      createdBy: "Amit",
      amount: "8710",
      pdfUrl: "http://example.com/pdf/47.pdf",
    },
    {
      leadId: "943798",
      leadSource: "Google Ads",
      quotationNo: "SMT/24-25/0048",
      clientName: "Client_91",
      contactPerson: "Sara",
      email: "user4@example.com",
      assignedTo: "Amit",
      createdBy: "Rahul",
      amount: "4368",
      pdfUrl: "http://example.com/pdf/48.pdf",
    },
    {
      leadId: "705086",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0049",
      clientName: "Client_56",
      contactPerson: "Sara",
      email: "user20@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "7276",
      pdfUrl: "http://example.com/pdf/49.pdf",
    },
    {
      leadId: "551732",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0050",
      clientName: "Client_53",
      contactPerson: "Suman",
      email: "user85@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "8507",
      pdfUrl: "http://example.com/pdf/50.pdf",
    },
    {
      leadId: "341409",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0051",
      clientName: "Client_66",
      contactPerson: "Amit",
      email: "user7@example.com",
      assignedTo: "Amit",
      createdBy: "Rahul",
      amount: "6211",
      pdfUrl: "http://example.com/pdf/51.pdf",
    },
    {
      leadId: "686798",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0052",
      clientName: "Client_8",
      contactPerson: "Amit",
      email: "user24@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "3182",
      pdfUrl: "http://example.com/pdf/52.pdf",
    },
    {
      leadId: "633957",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0053",
      clientName: "Client_76",
      contactPerson: "Vikram",
      email: "user26@example.com",
      assignedTo: "Amit",
      createdBy: "Neha",
      amount: "5209",
      pdfUrl: "http://example.com/pdf/53.pdf",
    },
    {
      leadId: "850797",
      leadSource: "LinkedIn",
      quotationNo: "SMT/24-25/0054",
      clientName: "Client_79",
      contactPerson: "Amit",
      email: "user29@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "1134",
      pdfUrl: "http://example.com/pdf/54.pdf",
    },
    {
      leadId: "642475",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0055",
      clientName: "Client_61",
      contactPerson: "Rahul",
      email: "user7@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "3023",
      pdfUrl: "http://example.com/pdf/55.pdf",
    },
    {
      leadId: "438268",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0056",
      clientName: "Client_71",
      contactPerson: "Rahul",
      email: "user12@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "3400",
      pdfUrl: "http://example.com/pdf/56.pdf",
    },
    {
      leadId: "789217",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0057",
      clientName: "Client_64",
      contactPerson: "Amit",
      email: "user88@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "1551",
      pdfUrl: "http://example.com/pdf/57.pdf",
    },
    {
      leadId: "852148",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0058",
      clientName: "Client_56",
      contactPerson: "Priya",
      email: "user27@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "9152",
      pdfUrl: "http://example.com/pdf/58.pdf",
    },
    {
      leadId: "178862",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0059",
      clientName: "Client_65",
      contactPerson: "Suman",
      email: "user42@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "8296",
      pdfUrl: "http://example.com/pdf/59.pdf",
    },
    {
      leadId: "324237",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0060",
      clientName: "Client_76",
      contactPerson: "Suman",
      email: "user61@example.com",
      assignedTo: "Rahul",
      createdBy: "Neha",
      amount: "7015",
      pdfUrl: "http://example.com/pdf/60.pdf",
    },
    {
      leadId: "381486",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0061",
      clientName: "Client_84",
      contactPerson: "Vikram",
      email: "user48@example.com",
      assignedTo: "Rahul",
      createdBy: "Neha",
      amount: "2048",
      pdfUrl: "http://example.com/pdf/61.pdf",
    },
    {
      leadId: "971430",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0062",
      clientName: "Client_22",
      contactPerson: "Suman",
      email: "user37@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "7620",
      pdfUrl: "http://example.com/pdf/62.pdf",
    },
    {
      leadId: "353558",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0063",
      clientName: "Client_23",
      contactPerson: "Kunal",
      email: "user61@example.com",
      assignedTo: "Amit",
      createdBy: "Rahul",
      amount: "4572",
      pdfUrl: "http://example.com/pdf/63.pdf",
    },
    {
      leadId: "116337",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0064",
      clientName: "Client_58",
      contactPerson: "Vikram",
      email: "user40@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "2984",
      pdfUrl: "http://example.com/pdf/64.pdf",
    },
    {
      leadId: "200018",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0065",
      clientName: "Client_45",
      contactPerson: "Kunal",
      email: "user21@example.com",
      assignedTo: "Amit",
      createdBy: "Neha",
      amount: "6512",
      pdfUrl: "http://example.com/pdf/65.pdf",
    },
    {
      leadId: "726608",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0066",
      clientName: "Client_29",
      contactPerson: "Sara",
      email: "user89@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "8067",
      pdfUrl: "http://example.com/pdf/66.pdf",
    },
    {
      leadId: "175706",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0067",
      clientName: "Client_1",
      contactPerson: "Amit",
      email: "user83@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "5294",
      pdfUrl: "http://example.com/pdf/67.pdf",
    },
    {
      leadId: "842543",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0068",
      clientName: "Client_15",
      contactPerson: "Neha",
      email: "user2@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "6972",
      pdfUrl: "http://example.com/pdf/68.pdf",
    },
    {
      leadId: "262945",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0069",
      clientName: "Client_10",
      contactPerson: "Neha",
      email: "user1@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "5564",
      pdfUrl: "http://example.com/pdf/69.pdf",
    },
    {
      leadId: "535305",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0070",
      clientName: "Client_100",
      contactPerson: "Kunal",
      email: "user17@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "7764",
      pdfUrl: "http://example.com/pdf/70.pdf",
    },
    {
      leadId: "272595",
      leadSource: "Google Ads",
      quotationNo: "SMT/24-25/0071",
      clientName: "Client_91",
      contactPerson: "Vikram",
      email: "user41@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "9444",
      pdfUrl: "http://example.com/pdf/71.pdf",
    },
    {
      leadId: "540860",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0072",
      clientName: "Client_58",
      contactPerson: "Sara",
      email: "user67@example.com",
      assignedTo: "Neha",
      createdBy: "Neha",
      amount: "6191",
      pdfUrl: "http://example.com/pdf/72.pdf",
    },
    {
      leadId: "749805",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0073",
      clientName: "Client_100",
      contactPerson: "Sara",
      email: "user27@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "6874",
      pdfUrl: "http://example.com/pdf/73.pdf",
    },
    {
      leadId: "453380",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0074",
      clientName: "Client_96",
      contactPerson: "Suman",
      email: "user97@example.com",
      assignedTo: "Amit",
      createdBy: "Rahul",
      amount: "6905",
      pdfUrl: "http://example.com/pdf/74.pdf",
    },
    {
      leadId: "124338",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0075",
      clientName: "Client_59",
      contactPerson: "Amit",
      email: "user46@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "2371",
      pdfUrl: "http://example.com/pdf/75.pdf",
    },
    {
      leadId: "431708",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0076",
      clientName: "Client_28",
      contactPerson: "Neha",
      email: "user24@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "3247",
      pdfUrl: "http://example.com/pdf/76.pdf",
    },
    {
      leadId: "892997",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0077",
      clientName: "Client_53",
      contactPerson: "Suman",
      email: "user66@example.com",
      assignedTo: "Neha",
      createdBy: "Neha",
      amount: "2223",
      pdfUrl: "http://example.com/pdf/77.pdf",
    },
    {
      leadId: "142436",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0078",
      clientName: "Client_15",
      contactPerson: "Vikram",
      email: "user71@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "6244",
      pdfUrl: "http://example.com/pdf/78.pdf",
    },
    {
      leadId: "643364",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0079",
      clientName: "Client_7",
      contactPerson: "Priya",
      email: "user15@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "3678",
      pdfUrl: "http://example.com/pdf/79.pdf",
    },
    {
      leadId: "597267",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0080",
      clientName: "Client_97",
      contactPerson: "Suman",
      email: "user33@example.com",
      assignedTo: "Rahul",
      createdBy: "Neha",
      amount: "3036",
      pdfUrl: "http://example.com/pdf/80.pdf",
    },
    {
      leadId: "715436",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0081",
      clientName: "Client_12",
      contactPerson: "Kunal",
      email: "user75@example.com",
      assignedTo: "Rahul",
      createdBy: "Neha",
      amount: "5539",
      pdfUrl: "http://example.com/pdf/81.pdf",
    },
    {
      leadId: "528358",
      leadSource: "Google Ads",
      quotationNo: "SMT/24-25/0082",
      clientName: "Client_10",
      contactPerson: "Amit",
      email: "user53@example.com",
      assignedTo: "Neha",
      createdBy: "Neha",
      amount: "6712",
      pdfUrl: "http://example.com/pdf/82.pdf",
    },
    {
      leadId: "154040",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0083",
      clientName: "Client_28",
      contactPerson: "Suman",
      email: "user46@example.com",
      assignedTo: "Amit",
      createdBy: "Rahul",
      amount: "7195",
      pdfUrl: "http://example.com/pdf/83.pdf",
    },
    {
      leadId: "570771",
      leadSource: "LinkedIn",
      quotationNo: "SMT/24-25/0084",
      clientName: "Client_55",
      contactPerson: "Priya",
      email: "user48@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "2834",
      pdfUrl: "http://example.com/pdf/84.pdf",
    },
    {
      leadId: "395250",
      leadSource: "LinkedIn",
      quotationNo: "SMT/24-25/0085",
      clientName: "Client_53",
      contactPerson: "Sara",
      email: "user67@example.com",
      assignedTo: "Rahul",
      createdBy: "Neha",
      amount: "9676",
      pdfUrl: "http://example.com/pdf/85.pdf",
    },
    {
      leadId: "567128",
      leadSource: "Google Ads",
      quotationNo: "SMT/24-25/0086",
      clientName: "Client_17",
      contactPerson: "Amit",
      email: "user6@example.com",
      assignedTo: "Neha",
      createdBy: "Neha",
      amount: "3714",
      pdfUrl: "http://example.com/pdf/86.pdf",
    },
    {
      leadId: "344523",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0087",
      clientName: "Client_15",
      contactPerson: "Kunal",
      email: "user83@example.com",
      assignedTo: "Rahul",
      createdBy: "Amit",
      amount: "9648",
      pdfUrl: "http://example.com/pdf/87.pdf",
    },
    {
      leadId: "262969",
      leadSource: "Facebook",
      quotationNo: "SMT/24-25/0088",
      clientName: "Client_36",
      contactPerson: "Sara",
      email: "user52@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "5364",
      pdfUrl: "http://example.com/pdf/88.pdf",
    },
    {
      leadId: "449171",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0089",
      clientName: "Client_66",
      contactPerson: "Sara",
      email: "user77@example.com",
      assignedTo: "Neha",
      createdBy: "Amit",
      amount: "6274",
      pdfUrl: "http://example.com/pdf/89.pdf",
    },
    {
      leadId: "236637",
      leadSource: "LinkedIn",
      quotationNo: "SMT/24-25/0090",
      clientName: "Client_35",
      contactPerson: "Rahul",
      email: "user1@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "2373",
      pdfUrl: "http://example.com/pdf/90.pdf",
    },
    {
      leadId: "225606",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0091",
      clientName: "Client_97",
      contactPerson: "Neha",
      email: "user86@example.com",
      assignedTo: "Neha",
      createdBy: "Neha",
      amount: "3208",
      pdfUrl: "http://example.com/pdf/91.pdf",
    },
    {
      leadId: "575242",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0092",
      clientName: "Client_4",
      contactPerson: "Kunal",
      email: "user12@example.com",
      assignedTo: "Amit",
      createdBy: "Neha",
      amount: "3832",
      pdfUrl: "http://example.com/pdf/92.pdf",
    },
    {
      leadId: "542310",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0093",
      clientName: "Client_89",
      contactPerson: "Kunal",
      email: "user88@example.com",
      assignedTo: "Amit",
      createdBy: "Neha",
      amount: "7300",
      pdfUrl: "http://example.com/pdf/93.pdf",
    },
    {
      leadId: "977361",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0094",
      clientName: "Client_19",
      contactPerson: "Kunal",
      email: "user41@example.com",
      assignedTo: "Rahul",
      createdBy: "Amit",
      amount: "3445",
      pdfUrl: "http://example.com/pdf/94.pdf",
    },
    {
      leadId: "363735",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0095",
      clientName: "Client_19",
      contactPerson: "Amit",
      email: "user56@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "4995",
      pdfUrl: "http://example.com/pdf/95.pdf",
    },
    {
      leadId: "640283",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0096",
      clientName: "Client_87",
      contactPerson: "Sara",
      email: "user85@example.com",
      assignedTo: "Neha",
      createdBy: "Rahul",
      amount: "3133",
      pdfUrl: "http://example.com/pdf/96.pdf",
    },
    {
      leadId: "320721",
      leadSource: "Direct Contact",
      quotationNo: "SMT/24-25/0097",
      clientName: "Client_92",
      contactPerson: "Neha",
      email: "user23@example.com",
      assignedTo: "Amit",
      createdBy: "Neha",
      amount: "5104",
      pdfUrl: "http://example.com/pdf/97.pdf",
    },
    {
      leadId: "285659",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0098",
      clientName: "Client_13",
      contactPerson: "Suman",
      email: "user8@example.com",
      assignedTo: "Amit",
      createdBy: "Amit",
      amount: "2657",
      pdfUrl: "http://example.com/pdf/98.pdf",
    },
    {
      leadId: "467073",
      leadSource: "Email Campaign",
      quotationNo: "SMT/24-25/0099",
      clientName: "Client_81",
      contactPerson: "Rahul",
      email: "user50@example.com",
      assignedTo: "Rahul",
      createdBy: "Amit",
      amount: "7406",
      pdfUrl: "http://example.com/pdf/99.pdf",
    },
    {
      leadId: "953885",
      leadSource: "Referral",
      quotationNo: "SMT/24-25/0100",
      clientName: "Client_32",
      contactPerson: "Suman",
      email: "user15@example.com",
      assignedTo: "Rahul",
      createdBy: "Rahul",
      amount: "2012",
      pdfUrl: "http://example.com/pdf/100.pdf",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;

  const filteredQuotations = quotations.filter((quotation) =>
    Object.values(quotation)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const paginatedQuotations = filteredQuotations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filteredQuotations.length / itemsPerPage);

  const handleEditQuotations = () => {
    // const quotationsWithIds = newQuotations.map((quotation) => ({
    //   ...quotation,
    //   id: `QUO-${Math.floor(100000 + Math.random() * 900000)}`,
    // }));

    // setQuotations((prev) => [...prev, ...quotationsWithIds]);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedQuotations = quotations.filter((_, i) => i !== index);
    setQuotations(updatedQuotations);
  };

  return (
    <div className="min-h-screen bg-white p-3">
      <ToastContainer />

      {isModalOpen && (
        <QuotationForm
          onQuotationsSave={handleEditQuotations}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search quotations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 border border-gray-300 bg-gray-100 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-black"
        />
      </div>

      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-12 text-left font-medium text-sm">Timestamp</th>
              <th className=" text-center font-medium text-sm">Lead ID</th>
              <th className="px-3 text-left font-medium text-sm">Source</th>
              <th className="px-6 text-center font-medium text-sm">
                Quotation No.
              </th>
              <th className="px-3 text-left font-medium text-sm">
                Client Name
              </th>
              <th className="px-3 text-left font-medium text-sm">
                Contact Person
              </th>
              <th className="px-3 text-left font-medium text-sm">Email</th>
              <th className="px-3 text-left font-medium text-sm">
                Assigned to
              </th>
              <th className="px-3 text-left font-medium text-sm">Created by</th>
              <th className="px-3 text-left font-medium text-sm">
                Quotation Amount
              </th>
              <th className="px-3 text-left font-medium text-sm">PDF URL</th>
              <th className="px-3 text-left font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedQuotations.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 w-full py-4 text-center text-gray-500"
                >
                  No quotations found
                </td>
              </tr>
            ) : (
              paginatedQuotations.map((quotation, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border border-t-gray-300"
                >
                  <td className="px-2 py-1 text-sm">
                    {new Date().toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-2 py-1 text-sm">{quotation.leadId}</td>
                  <td className="px-2 py-1 text-sm">{quotation.leadSource}</td>
                  <td className="px-2 py-1 text-sm">{quotation.quotationNo}</td>
                  <td className="px-2 py-1 text-sm">{quotation.clientName}</td>
                  <td className="px-2 py-1 text-sm">
                    {quotation.contactPerson}
                  </td>
                  <td className="px-2 py-1 text-sm">{quotation.email}</td>
                  <td className="px-2 py-1 text-sm">{quotation.assignedTo}</td>
                  <td className="px-2 py-1 text-sm">{quotation.createdBy}</td>
                  <td className="px-2 py-1 text-sm">{quotation.amount}</td>
                  <td className="px-2 py-1 text-sm">
                    <a
                      href={quotation.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline"
                    >
                      <FaFilePdf size={20} />
                    </a>
                  </td>
                  <td className="px-2 py-1 text-center text-sm">
                    <button
                      onClick={handleEditQuotations}
                      className="text-indigo-600 mr-2 hover:text-indigo-800"
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

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-800 font-semibold">
          {filteredQuotations.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          previousLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Prev
            </span>
          }
          nextLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Next
            </span>
          }
          activeClassName="bg-indigo-600 text-white font-semibold px-2 rounded-sm transition-all"
          disabledClassName="text-gray-400 cursor-not-allowed"
          pageClassName="px-2 rounded-sm  text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all"
          breakClassName="text-gray-600"
        />
      </div>
    </div>
  );
}

export default QuotationPage;

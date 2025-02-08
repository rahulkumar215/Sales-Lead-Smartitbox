import { FaEdit, FaPhoneAlt, FaTrashAlt } from "react-icons/fa";
import PopOver from "../universal/PopOver";
import { IoMail } from "react-icons/io5";

const LeadTable = ({
  toggleExpandRow,
  index,
  lead,
  expandedRow,
  handleEditLead,
  handleDelete,
  userInfo,
}) => {
  return (
    <tr
      onClick={() => toggleExpandRow(index)}
      className={`hover:bg-gray-50 cursor-pointer transition-all duration-300 ease-in-out  ${
        expandedRow === index ? "bg-gray-300 hover:!bg-gray-400" : ""
      }`}
    >
      <td className="text-center">
        <button
          onClick={(e) => handleEditLead(e, lead.leadDetails.leadId)}
          className="text-indigo-600 mr-2 hover:text-indigo-800"
        >
          <FaEdit size={20} />
        </button>
        {userInfo.role === "admin" && (
          <button
            onClick={(e) => handleDelete(e, lead.leadDetails.leadId)}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrashAlt size={20} />
          </button>
        )}
      </td>
      <td className="py-2">{lead.leadDetails.timestamp}</td>
      <td className="text-red-800 font-bold">{lead.leadDetails.leadId}</td>
      <td>
        <span
          className={`px-2 py-1 rounded-md ${
            lead.leadDetails.leadType === "NBD"
              ? "bg-red-200 border border-red-400"
              : "bg-green-200 border border-green-400"
          }`}
        >
          {lead.leadDetails.leadType}
        </span>
      </td>
      <td>{lead.leadDetails.name}</td>
      <td>{lead.leadDetails.leadSource}</td>
      <td>{lead.leadDetails.contactPerson}</td>
      <PopOver
        value={lead.leadDetails.number}
        link={`tel:${lead.leadDetails.number}`}
      >
        <FaPhoneAlt size={20} className="text-green-700" />
      </PopOver>
      <PopOver
        value={lead.leadDetails.email}
        link={`mailto:${lead.leadDetails.email}`}
      >
        <IoMail size={20} className="text-red-700" />
      </PopOver>
      <td>{lead.leadDetails.designation}</td>
      <td>
        <span
          className={`px-2 py-1 rounded-md ${
            lead.leadDetails.enquiryType === "Hot" &&
            "bg-red-200 border border-red-400"
          } ${
            lead.leadDetails.enquiryType === "Cold" &&
            " bg-blue-200 border border-blue-400"
          } ${
            lead.leadDetails.enquiryType === "Warm" &&
            "bg-yellow-200  border border-yellow-400"
          }`}
        >
          {lead.leadDetails.enquiryType}
        </span>
      </td>
      <td>{lead.leadDetails.assignedTo}</td>
      <td>{lead.leadDetails.remarks}</td>
      <td>{lead.leadDetails.followupDate}</td>
      <td>{lead.leadDetails.punchedBy}</td>
      <td>
        <span
          className={`px-1 py-0.5 rounded-md ${
            lead.leadDetails.status === "Won"
              ? "bg-green-200 border border-green-400"
              : lead.leadDetails.status === "Lost"
              ? "bg-red-200 border border-red-400"
              : "bg-yellow-200 border border-yellow-400"
          }`}
        >
          {lead.leadDetails.status}
        </span>
      </td>
    </tr>
  );
};

export default LeadTable;

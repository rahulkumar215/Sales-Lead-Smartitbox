import { FaFilePdf } from "react-icons/fa";
import { IoIosClose, IoIosPaper } from "react-icons/io";

// const followUpdata = [
//   {
//     leadId: "L-001",
//     timestamp: new Date("2025-01-24T16:55:00"), // Real timestamp
//     status: "In-Process",
//     remarks: "Called the client",
//     followUpDate: "2025-01-26",
//   },
//   {
//     leadId: "L-001",
//     timestamp: new Date("2025-01-26T17:00:00"), // Real timestamp
//     status: "In-Process",
//     remarks: "Visited the client",
//     followUpDate: "2025-01-27",
//   },
//   {
//     leadId: "L-001",
//     timestamp: new Date("2025-01-27T18:00:00"), // Real timestamp
//     status: "Quotation sent",
//     amount: "100000",
//     url: "file:///C:/Users/user/Downloads/quotation%20-%202025-01-25T153158.845.pdf",
//   },
//   {
//     leadId: "L-001",
//     timestamp: new Date("2025-01-28T14:00:00"), // Real timestamp
//     status: "Quotation revised",
//     amount: "95000",
//     url: "file:///C:/Users/user/Downloads/quotation%20(77).pdf",
//   },
//   {
//     leadId: "L-001",
//     timestamp: new Date("2025-01-28T17:00:00"), // Real timestamp
//     status: "Won",
//     finalAmount: "95000",
//   },
//   {
//     leadId: "L-001",
//     timestamp: new Date("2025-01-28T16:00:00"), // Real timestamp
//     status: "Lost",
//     reason: "Bought from other",
//   },
// ];

const FollowUpHistory = ({ data = "", closeModal }) => {
  console.log(data);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white sm:w-2/3 w-11/12 rounded-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-6 border-b-2 relative border-gray-400">
        <div className="flex  justify-between w-full items-center mb-4">
          <h3 className="text-2xl font-semibold text-indigo-600">
            Follow Up History : {data[0]?.leadId || ""}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 absolute top-2 right-2 hover:text-gray-600"
          >
            <IoIosClose size={40} />
          </button>
        </div>
        <div className="flex flex-col min-w-[39.87rem] overflow-x-auto justify-center">
          {data.length === 0 ? (
            <p className="font-semibold text-center text-gray-500">
              There is no followup for this lead.
            </p>
          ) : (
            data
              .sort((a, b) => {
                const timeA = new Date(a.timestamp).getTime();
                const timeB = new Date(b.timestamp).getTime();
                return timeB - timeA;
              })
              .map((row, index) => (
                <div
                  key={index}
                  className=" text-sm  text-gray-700 flex items-center gap-2 p-2 border border-t-0 border-r-0 border-l-0 border-b-black border-dotted   w-full sm:w-auto"
                >
                  <p className="mr-2">
                    {new Date(row.timestamp).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  <div className=" w-40">
                    <p
                      className={`px-2 py-1 w-fit rounded-md ${
                        row.status === "Won" &&
                        "bg-green-200 border border-green-400"
                      } ${
                        row.status === "Lost" &&
                        "bg-red-200 border border-red-400"
                      } ${
                        row.status === "In-Process" &&
                        "bg-yellow-200 border border-yellow-400"
                      } ${
                        row.status === "Quotation sent" &&
                        "bg-blue-200 border border-blue-400"
                      } ${
                        row.status === "Quotation revised" &&
                        "bg-purple-200 border border-purple-400"
                      }`}
                    >
                      {row.status}
                    </p>
                  </div>

                  {row.remarks && <p>{row.remarks}</p>}
                  {row.followUpDate && (
                    <p>
                      <span className=" font-semibold">Next Follow Up : </span>
                      {row.followUpDate}
                    </p>
                  )}
                  {row.amount && (
                    <p>
                      <span className="font-semibold">Amount : </span>{" "}
                      {row.amount}
                    </p>
                  )}
                  {row.finalAmount && (
                    <p>
                      <span className="font-semibold">Final Amount : </span>{" "}
                      {row.finalAmount}
                    </p>
                  )}
                  {row.url && (
                    <div className="flex items-center">
                      <span className=" font-semibold">File : </span>
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFilePdf size={20} className="mr-2 text-red-600" />
                      </a>
                    </div>
                  )}
                  {row.reason && (
                    <p>
                      <span className="font-semibold">Reason : </span>
                      {row.reason}
                    </p>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowUpHistory;

import {
  FaUsers,
  FaChartPie,
  FaDollarSign,
  FaFileInvoice,
  FaClipboardList,
  FaRegClock,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { User, CheckCircle, TrendingUp, Clock, Zap } from "lucide-react";

function Card({ card, classes = "" }) {
  return (
    <div
      className={`${classes} bg-white p-4 grid grid-cols-[1fr_min-content] justify-between  items-center rounded-lg shadow-lg cursor-pointer transition-transform transform duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold ">{card.title}</h3>
        <p className="text-2xl font-bold">{card.value}</p>
      </div>
      {card.icon}
    </div>
  );
}

const Dashboard = () => {
  // Card Data
  const cardData = [
    {
      title: "Leads",
      value: 1000,
      icon: <FaUsers className="text-3xl text-blue-500" />,
    },
    {
      title: "Conv. Rate",
      value: "45%",
      icon: <FaChartPie className="text-3xl text-green-500" />,
    },
    {
      title: "Revenue",
      value: "$50,000",
      icon: <FaDollarSign className="text-3xl text-yellow-500" />,
    },
    {
      title: "Users",
      value: 150,
      icon: <FaUsers className="text-3xl text-indigo-500" />,
    },
    {
      title: "Clients",
      value: 200,
      icon: <FaUsers className="text-3xl text-purple-500" />,
    },
    {
      title: "Quotations",
      value: 120,
      icon: <FaClipboardList className="text-3xl text-red-500" />,
    },
    {
      title: "Proforma Invoices",
      value: 80,
      icon: <FaFileInvoice className="text-3xl text-pink-500" />,
    },
    {
      title: "Quote Value",
      value: "$100,000",
      icon: <FaDollarSign className="text-3xl text-teal-500" />,
    },
    {
      title: "P.I. Value",
      value: "$75,000",
      icon: <FaDollarSign className="text-3xl text-orange-500" />,
    },
    {
      title: "Difference",
      value: "$25,000",
      icon: <FaDollarSign className="text-3xl text-gray-500" />,
    },
    {
      title: "Avg. Res. Time",
      value: "2 hrs",
      icon: <FaRegClock className="text-3xl text-red-500" />,
    },
  ];

  // Chart Data
  const leadSourcesData = [
    { name: "Website", value: 40 },
    { name: "Social Media", value: 30 },
    { name: "Referral", value: 20 },
    { name: "Other", value: 10 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const leadConversionsData = [
    { source: "Website", conversions: 35 },
    { source: "Social Media", conversions: 25 },
    { source: "Referral", conversions: 15 },
    { source: "Other", conversions: 5 },
  ];

  const topItemsData = [
    { item: "Item A", count: 50 },
    { item: "Item B", count: 30 },
    { item: "Item C", count: 20 },
    { item: "Item D", count: 15 },
  ];

  // Sales Team Performance Table Data
  const salesTeamData = [
    {
      name: "Alice",
      totalLeads: 100,
      won: 40,
      lost: 20,
      inProcess: 40,
      conversionRate: "40%",
      avgResponse: "1.5 hrs",
    },
    {
      name: "Bob",
      totalLeads: 80,
      won: 30,
      lost: 25,
      inProcess: 25,
      conversionRate: "37.5%",
      avgResponse: "2 hrs",
    },
    {
      name: "Charlie",
      totalLeads: 120,
      won: 50,
      lost: 30,
      inProcess: 40,
      conversionRate: "41.7%",
      avgResponse: "2.5 hrs",
    },
  ];

  const revenueBySalesData = [
    { name: "Alice", revenue: 20000 },
    { name: "Bob", revenue: 15000 },
    { name: "Charlie", revenue: 25000 },
  ];

  // Top Performing Sales Rep
  const topPerformingSalesRep = {
    name: "Charlie",
    totalLeads: 120,
    won: 50,
    conversionRate: "41.7%",
    avgResponse: "2.5 hrs",
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 w-full p-2 bg-white rounded-lg shadow-md text-center">
        Dashboard
      </h1>

      <div className="flex gap-4 mb-8">
        {/* Filters Section */}
        <div className="bg-white p-2 rounded-lg shadow-lg transition-all duration-300">
          {/* <h2 className="text-xl font-semibold mb-4">Filters</h2> */}
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-col">
              <label htmlFor="dateFrom" className="mb-">
                From Date
              </label>
              <input
                type="date"
                id="dateFrom"
                className="border px-2 py-1 text-md bg-yellow-100 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dateTo" className="mb-">
                To Date
              </label>
              <input
                type="date"
                id="dateTo"
                className="border px-2 py-1 text-md bg-yellow-100 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="source" className="mb-">
                Lead Source
              </label>
              <select
                id="source"
                className="border px-2 py-[6px] text-md bg-yellow-100 rounded"
              >
                <option value="">All</option>
                <option value="website">Website</option>
                <option value="social">Social Media</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="salesExec">Sales Executive</label>
              <select
                id="salesExec"
                className="border px-2 py-[6px] text-md bg-yellow-100 rounded"
              >
                <option value="">All</option>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Charlie">Charlie</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-blue-500 text-white px-2 py-2 text-sm rounded transition-transform transform hover:bg-blue-600">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        <Card card={cardData[3]} classes=" flex-grow !p-2 !px-4" />
        <Card card={cardData[4]} classes=" flex-grow !p-2 !px-4" />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mb-8">
        <Card card={cardData[0]} />
        <Card card={cardData[1]} />
        <Card card={cardData[2]} />
        <Card card={cardData[5]} />
        <Card card={cardData[6]} />
        <Card card={cardData[7]} />
        <Card card={cardData[8]} />
        <Card card={cardData[9]} />
        <Card card={cardData[10]} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart: Top Lead Sources */}
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Top Lead Sources (%)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSourcesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {leadSourcesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Top Lead Conversions by Source */}
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Top Lead Conversions by Source (%)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={leadConversionsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="conversions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Top Items Bought */}
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Top Items Bought</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topItemsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Team Performance Table */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-700">
          Sales Team Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-200">
                {[
                  "Sales Executive Name",
                  "Total Leads",
                  "Won",
                  "Lost",
                  "In-Process",
                  "Conversion Rate",
                  "Avg. Response Time",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesTeamData.map((rep, index) => {
                const conversionRateValue = parseFloat(rep.conversionRate);
                const avgResponseValue = parseFloat(rep.avgResponse);

                let conversionRateClass =
                  conversionRateValue >= 50
                    ? "text-green-700 font-bold"
                    : conversionRateValue >= 25
                    ? "text-yellow-700  font-bold"
                    : "text-red-700 font-bold";

                let avgResponseClass =
                  avgResponseValue <= 1
                    ? "text-green-700 font-bold"
                    : avgResponseValue <= 3
                    ? "text-yellow-700  font-bold"
                    : "text-red-700 font-bold";

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-sm sm:!text-md md:!text-lg text-gray-700">
                      {rep.name}
                    </td>
                    <td className="px-6 py-4 text-sm sm:!text-md md:!text-lg text-gray-700">
                      {rep.totalLeads}
                    </td>
                    <td className="px-6 py-4 text-sm sm:!text-md md:!text-lg text-gray-700">
                      {rep.won}
                    </td>
                    <td className="px-6 py-4 text-sm sm:!text-md md:!text-lg text-gray-700">
                      {rep.lost}
                    </td>
                    <td className="px-6 py-4 text-sm sm:!text-md md:!text-lg text-gray-700">
                      {rep.inProcess}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm sm:!text-md md:!text-lg ${conversionRateClass}`}
                    >
                      {rep.conversionRate}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm sm:!text-md md:!text-lg ${avgResponseClass}`}
                    >
                      {rep.avgResponse}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Sales Rep & Revenue by Sales Executive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center gap-6 border border-gray-200">
          <h2 className="text-2xl px-4 py-2 font-bold tracking-wide text-gray-800 flex items-center justify-start w-full gap-2">
            <TrendingUp size={30} className="text-green-500" />
            Top Performing Sales Rep
          </h2>
          <div className="flex-grow w-full p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <User size={24} />
              </div>
              <p className="text-lg font-bold text-gray-900">
                {topPerformingSalesRep.name}
              </p>
            </div>
            <div className="text-gray-600 flex flex-col gap-1  mt-2 space-y-1">
              <p className="flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" />
                Total Leads:{" "}
                <span className="font-medium">
                  {topPerformingSalesRep.totalLeads}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                Won:{" "}
                <span className="font-medium">
                  {topPerformingSalesRep.won || "N/A"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-500" />
                Conversion Rate:{" "}
                <span className="font-medium">
                  {topPerformingSalesRep.conversionRate}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} className="text-purple-500" />
                Avg. Response Time:{" "}
                <span className="font-medium">
                  {topPerformingSalesRep.avgResponse}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Revenue by Sales Executive
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueBySalesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

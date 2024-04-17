import React, { useState, useEffect } from "react";
import axios from "axios";

function JobCardIssue() {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/all",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching submitted data:", error);
    }
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const filteredData = submittedData.filter((dataItem) =>
    dataItem.selectedOption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Party Name..."
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Party Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Challan Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Kg
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Meter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Roll
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((dataItem, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.selectedOption}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.challanNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.kg}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.meter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.roll}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JobCardIssue;
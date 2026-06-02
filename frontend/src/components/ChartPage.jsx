import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const ChartsPage = () => {
  const [chartsData, setChartsData] = useState([]);

useEffect(() => {
  fetch("http://localhost:8000/jobs/")
    .then((res) => res.json())
    .then((apiData) => {
      const jobs = apiData.jobs; 

      const statusCount = {};
      jobs.forEach((item) => {
        const status = item.status.trim();
        statusCount[status] = (statusCount[status] || 0) + 1;
      });

      const statusChart = {
        title: "Applications by Status",
        chartType: "PieChart",
        data: [
          ["Status", "Count"],
          ...Object.entries(statusCount),
        ],
        options: { pieHole: 0.4 },
      };

      const companyCount = {};
      jobs.forEach((item) => {
        const company = item.company.trim();
        companyCount[company] = (companyCount[company] || 0) + 1;
      });

      const companyChart = {
        title: "Applications per Company",
        chartType: "ColumnChart",
        data: [
          ["Company", "Applications"],
          ...Object.entries(companyCount),
        ],
      };

      const dateCount = {};
      jobs.forEach((item) => {
        const date = item.applied_date;
        dateCount[date] = (dateCount[date] || 0) + 1;
      });

      const dateChart = {
        title: "Applications Over Time",
        chartType: "LineChart",
        data: [
          ["Date", "Applications"],
          ...Object.entries(dateCount),
        ],
      };

      setChartsData([statusChart, companyChart, dateChart]);
    })
    .catch((err) => console.error(err));
}, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
      }}
    >
      <h2>Charts Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
        }}
      >
        {chartsData.map((chart, idx) => (
          <div
            key={idx}
            style={{
              padding: 18,
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <h4>{chart.title}</h4>

            <Chart
              width="100%"
              height="320px"
              chartType={chart.chartType}
              loader={<div>Loading chart...</div>}
              data={chart.data}
              options={chart.options}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsPage;
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ elements, handleSort, handleReset, activeColumns }) => {
  const [chartData, setChartData] = useState({
    labels: elements.map((_, idx) => idx.toString()),
    datasets: [
      {
        label: "Values",
        data: elements,
        backgroundColor: elements.map(() => "rgba(0,123,255,0.5)"),
        borderColor: elements.map(() => "rgba(0,123,255,1)"),
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: elements.map((_, idx) => idx.toString()),
      datasets: [
        {
          label: "Values",
          data: elements,
          backgroundColor: elements.map((_, idx) =>
            activeColumns.includes(idx) ? "rgba(220, 53, 69, 0.6)" : "rgba(0,123,255,0.5)"
          ),
          borderColor: elements.map((_, idx) =>
            activeColumns.includes(idx) ? "rgba(220, 53, 69, 1)" : "rgba(0,123,255,1)"
          ),
          borderWidth: 1,
        },
      ],
    });
  }, [elements, activeColumns]);
  return (
    <div>
      <div className="chart-container">
        <Bar data={chartData} width={3} height={1} />
      </div>
      <div className="button-action">
        <button className="button-64" onClick={handleSort}>
          <span className="text">Sort</span>
        </button>
        <button className="button-64" onClick={handleReset}>
          <span className="text">Reset</span>
        </button>
      </div>
    </div>
  );
};

export default BarChart;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const SortingBubble = ({ elements, setElements, sorting, activeColumns, setActiveColumns }) => {
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

  const bubbleSort = async () => {
    const len = elements.length;

    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        setActiveColumns([j, j + 1]);
        if (elements[j] > elements[j + 1]) {
          const temp = elements[j];
          elements[j] = elements[j + 1];
          elements[j + 1] = temp;

          await sleep(500);
          setElements([...elements]);
        }
      }
    }

    setActiveColumns([]);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSort = () => {
    bubbleSort();
  };

  const handleReset = () => {
    setElements([]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Bubble Sort</h1>
      <div>
        <Bar data={chartData} width={3} height={1} />
      </div>
      <div>
        <button onClick={handleSort} disabled={sorting}>
          Sort
        </button>
        <button onClick={handleReset} disabled={sorting}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SortingBubble;

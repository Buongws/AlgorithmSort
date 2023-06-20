/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const SortingSelection = ({ elements, setElements, activeColumns, setActiveColumns }) => {
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

  const selectionSort = async () => {
    let currentValueNewIndex;

    for (let i = 0; i < elements.length; i++) {
      currentValueNewIndex = i;
      for (let j = i + 1; j < elements.length; j++) {
        setActiveColumns([j, j + 1]);
        if (elements[currentValueNewIndex] > elements[j]) {
          currentValueNewIndex = j;
        }
      }
      if (i !== currentValueNewIndex) {
        let temp = elements[i];
        setActiveColumns([i, currentValueNewIndex]);
        elements[i] = elements[currentValueNewIndex];
        elements[currentValueNewIndex] = temp;
      }
      await sleep(500);
      setElements([...elements]);
    }

    setActiveColumns([]);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSort = () => {
    selectionSort();
  };

  const handleReset = () => {
    setElements([]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Selection Sort</h1>
      <div>
        <Bar data={chartData} width={3} height={1} />
      </div>
      <div>
        <button onClick={handleSort} className="button-34">
          Sort
        </button>
        <button onClick={handleReset} className="button-34">
          Reset
        </button>
      </div>
    </div>
  );
};

export default SortingSelection;

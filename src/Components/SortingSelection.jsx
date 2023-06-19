/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const SortingSelection = ({
  elements,
  setElements,
  sorting,
  setSorting,
  activeColumns,
  setActiveColumns,
  originalData,
}) => {
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
            activeColumns.includes(idx)
              ? "rgba(220, 53, 69, 0.6)"
              : "rgba(0,123,255,0.5)"
          ),
          borderColor: elements.map((_, idx) =>
            activeColumns.includes(idx)
              ? "rgba(220, 53, 69, 1)"
              : "rgba(0,123,255,1)"
          ),
          borderWidth: 1,
        },
      ],
    });
  }, [elements, activeColumns]);

  useEffect(() => {
    if (sorting) {
      selectionSort();
    }
  }, [sorting]);

  const selectionSort = async () => {
    let currentValueNewIndex;

    for (let i = 0; i < originalData.length; i++) {
      currentValueNewIndex = i;
      for (let j = i + 1; j < originalData.length; j++) {
        setActiveColumns([j, j + 1]);
        if (originalData[currentValueNewIndex] > originalData[j]) {
          currentValueNewIndex = j;
        }
      }
      if (i !== currentValueNewIndex) {
        let temp = originalData[i];
        setActiveColumns([i, currentValueNewIndex]);
        originalData[i] = originalData[currentValueNewIndex];
        originalData[currentValueNewIndex] = temp;
      }
      await sleep(1000);
      setElements([...originalData]);
    }

    setActiveColumns([]);
    setSorting(false);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSort = () => {
    setSorting(true);
  };

  const handleReset = () => {
    setElements([...originalData]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1>Selection Sort</h1>
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

export default SortingSelection;

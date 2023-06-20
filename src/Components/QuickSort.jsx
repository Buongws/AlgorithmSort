/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

const QuickSort = ({ elements, setElements, activeColumns, setActiveColumns }) => {
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

  const quickSort = async (array, start, end) => {
    if (start >= end) {
      return;
    }

    const pivotIndex = await partition(array, start, end);
    await quickSort(array, start, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, end);

    // Update sorting state after each recursive call
    if (start === 0 && end === array.length - 1) {
      return;
    }
  };

  const partition = async (array, start, end) => {
    const pivotValue = array[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      setActiveColumns([i, end]);
      await sleep(200);

      if (array[i] <= pivotValue) {
        await swap(array, i, pivotIndex);
        pivotIndex++;
      }
    }

    await swap(array, pivotIndex, end);
    setActiveColumns([]);
    setElements([...array]);

    return pivotIndex;
  };

  const swap = async (array, index1, index2) => {
    await sleep(200);

    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    setElements([...array]);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSort = () => {
    quickSort([...elements], 0, elements.length - 1);
  };

  const handleReset = () => {
    setElements([]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Quick Sort</h1>
      <div>
        <Bar data={chartData} width={3} height={1} />
        <button onClick={handleSort}>Sort</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default QuickSort;

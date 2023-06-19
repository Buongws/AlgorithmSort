/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const MergeSort = ({
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
      mergeSort([...originalData], 0, originalData.length - 1);
    }
  }, [sorting]);

  const mergeSort = async (array, start, end) => {
    setSorting(true); // Update sorting state at the beginning

    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSort(array, start, mid);
      await mergeSort(array, mid + 1, end);
      await merge(array, start, mid, end);
    }

    // Update sorting state when sorting is completely done
    if (start === 0 && end === array.length - 1) {
      setSorting(false);
    }
  };

  const merge = async (array, start, mid, end) => {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);

    let i = 0; // index for the left array
    let j = 0; // index for the right array
    let k = start; // index for the merged array

    while (i < leftArray.length && j < rightArray.length) {
      setActiveColumns([start + i, mid + 1 + j]);
      await sleep(500);

      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        i++;
      } else {
        array[k] = rightArray[j];
        j++;
      }

      k++;
    }

    while (i < leftArray.length) {
      setActiveColumns([start + i, end]);
      await sleep(500);

      array[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < rightArray.length) {
      setActiveColumns([start + i, mid + 1 + j]);
      await sleep(500);

      array[k] = rightArray[j];
      j++;
      k++;
    }

    setActiveColumns([]);
    setElements([...array]);
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
      <h1>MERGE SORT </h1>
      <div>
        <Bar data={chartData} width={3} height={1} />
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

export default MergeSort;

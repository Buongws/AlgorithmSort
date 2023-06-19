/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const HeapSort = ({
  elements,
  setElements,
  sorting,
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

  const heapSort = async () => {
    const n = originalData.length;

    // Xây dựng cây heap (sắp xếp cây heap)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(originalData, n, i);
    }

    // Lần lượt loại bỏ phần tử gốc (phần tử lớn nhất) và đưa vào cuối mảng đã sắp xếp
    for (let i = n - 1; i > 0; i--) {
      await sleep(500);
      setActiveColumns([0, i]);
      swap(originalData, 0, i);
      await heapify(originalData, i, 0);
      setElements([...originalData]);
    }

    setActiveColumns([]);
  };

  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;

    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      setActiveColumns([largest, i]);
      await sleep(500);
      swap(arr, i, largest);
      await heapify(arr, n, largest);
      setElements([...arr]);
    }
  };

  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSort = () => {
    heapSort();
  };

  const handleReset = () => {
    setElements([...originalData]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Heap Sort</h1>
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

export default HeapSort;

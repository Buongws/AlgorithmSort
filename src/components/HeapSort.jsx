/* eslint-disable react/prop-types */

import BarChart from "./BarChart";

const HeapSort = ({ elements, setElements, activeColumns, setActiveColumns }) => {
  const heapSort = async () => {
    const n = elements.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(elements, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      await sleep(500);
      setActiveColumns([0, i]);
      swap(elements, 0, i);
      await heapify(elements, i, 0);
      setElements([...elements]);
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
    setElements([]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Heap Sort</h1>
      <BarChart handleReset={handleReset} handleSort={handleSort} elements={elements} activeColumns={activeColumns} />
    </div>
  );
};

export default HeapSort;

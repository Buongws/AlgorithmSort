/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import BarChart from "./BarChart";

const MergeSort = ({ elements, setElements, activeColumns, setActiveColumns }) => {
  const mergeSort = async (array, start, end) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSort(array, start, mid);
      await mergeSort(array, mid + 1, end);
      await merge(array, start, mid, end);
    }

    if (start === 0 && end === array.length - 1) {
      return;
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
    mergeSort(elements, 0, elements.length - 1);
  };

  const handleReset = () => {
    setElements([]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Merge Sort</h1>
      <BarChart handleReset={handleReset} handleSort={handleSort} elements={elements} activeColumns={activeColumns} />
    </div>
  );
};

export default MergeSort;

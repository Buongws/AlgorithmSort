/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import BarChart from "./BarChart";

const QuickSort = ({ elements, setElements, activeColumns, setActiveColumns }) => {
  const quickSort = async (array, start, end) => {
    if (start >= end) {
      return;
    }

    const pivotIndex = await partition(array, start, end);
    await quickSort(array, start, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, end);

    // Update sorting state after each recursive call
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
      <BarChart handleReset={handleReset} handleSort={handleSort} elements={elements} activeColumns={activeColumns} />
    </div>
  );
};

export default QuickSort;

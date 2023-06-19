/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect, useCallback } from "react";

import SortingSelection from "./Components/SortingSelection";
import SortingBubble from "./Components/SortingBubble";
import QuickSort from "./Components/QuickSort";
import MergeSort from "./Components/MergeSort";

const App = () => {
  let originalData = [10, 30, 50, 20, 40, 20, 10, 55, 44, 12, 33, 65, 33, 22, 56, 44, 12, 10];
  const [toggleButton, setToggleButton] = useState("selectionSort");
  const [elements, setElements] = useState(originalData);
  const [, setSorting] = useState(false);
  const [activeColumns, setActiveColumns] = useState([]);

  const data = useMemo(() => {
    return {
      elements,
      setElements,
      setSorting,
      activeColumns,
      setActiveColumns,
      originalData,
    };
  }, [elements, setElements, activeColumns, setActiveColumns, originalData]);

  const handleButtonClicked = useCallback((e) => {
    setToggleButton(e.target.dataset.type);
  }, []);

  return (
    <div>
      <button onClick={handleButtonClicked} data-type="selectionSort">
        Selection Sort
      </button>
      <button onClick={handleButtonClicked} data-type="quickSort">
        Quick Sort
      </button>
      <button onClick={handleButtonClicked} data-type="mergeSort">
        Merge Sort
      </button>
      <button onClick={handleButtonClicked} data-type="bubbleSort">
        Bubble Sort
      </button>

      {toggleButton === "selectionSort" && <SortingSelection {...data} />}
      {toggleButton === "quickSort" && <QuickSort {...data} />}
      {toggleButton === "mergeSort" && <MergeSort {...data} />}
      {toggleButton === "bubbleSort" && <SortingBubble {...data} />}
    </div>
  );
};

export default App;

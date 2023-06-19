/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect, useCallback } from "react";

import SortingSelection from "./Components/SortingSelection";
import SortingBubble from "./Components/SortingBubble";
import QuickSort from "./Components/QuickSort";
import MergeSort from "./Components/MergeSort";
import HeapSort from "./Components/HeapSort";

const App = () => {
  let originalData = [
    10, 30, 50, 20, 40, 20, 10, 55, 44, 12, 33, 65, 33, 22, 56, 44, 12, 10,
  ];
  const [toggleButton, setToggleButton] = useState("selectionSort");
  const [elements, setElements] = useState(originalData);
  const [input, setInput] = useState("");
  const [activeColumns, setActiveColumns] = useState([]);

  const data = useMemo(() => {
    return {
      elements,
      setElements,

      activeColumns,
      setActiveColumns,
      originalData,
    };
  }, [elements, setElements, activeColumns, setActiveColumns, originalData]);

  const handleButtonClicked = useCallback((e) => {
    setToggleButton(e.target.dataset.type);
  }, []);

  const handleInputChanged = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  const handleOnInputKeyPress = useCallback((e) => {
    if (
      (e.keyCode < 48 || e.keyCode > 57) & (e.keyCode != 8) &&
      e.keyCode != 44
    ) {
      e.preventDefault();
    }
    // if (!regex.test(e.target.value)) {
    //   e.preventDefault();
    // }
    // console.log(/^[0-9\b.,]+$/.test(e.target.value));
    // // return false;
    // return /^[0-9\b.,]+$/.test(e.target.value);
  }, []);
  return (
    <div>
      <div className="center-div">
        <button
          className="button-5"
          role="button"
          onClick={handleButtonClicked}
          data-type="selectionSort"
        >
          Selection Sort
        </button>
        <button
          className="button-5"
          role="button"
          onClick={handleButtonClicked}
          data-type="quickSort"
        >
          Quick Sort
        </button>
        <button
          className="button-5"
          role="button"
          onClick={handleButtonClicked}
          data-type="mergeSort"
        >
          Merge Sort
        </button>
        <button
          className="button-5"
          role="button"
          onClick={handleButtonClicked}
          data-type="bubbleSort"
        >
          Bubble Sort
        </button>
        <button
          className="button-5"
          role="button"
          onClick={handleButtonClicked}
          data-type="heapSort"
        >
          Heap Sort
        </button>
      </div>

      {toggleButton === "selectionSort" && <SortingSelection {...data} />}
      {toggleButton === "quickSort" && <QuickSort {...data} />}
      {toggleButton === "mergeSort" && <MergeSort {...data} />}
      {toggleButton === "bubbleSort" && <SortingBubble {...data} />}
      {toggleButton === "heapSort" && <HeapSort {...data} />}
      <div>
        <input
          type="text"
          // onChange={handleInputChanged}
          onKeyDown={handleOnInputKeyPress}
        />
      </div>
    </div>
  );
};

export default App;

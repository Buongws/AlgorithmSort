/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect, useCallback } from "react";

import SortingSelection from "./Components/SortingSelection";
import SortingBubble from "./Components/SortingBubble";
import QuickSort from "./Components/QuickSort";
import MergeSort from "./Components/MergeSort";
import HeapSort from "./Components/HeapSort";

const App = () => {
  const [toggleButton, setToggleButton] = useState("selectionSort");
  const [elements, setElements] = useState([7, 4, 2, 6, 2, 5, 6, 3, 9, 22]);
  const [input, setInput] = useState("");
  const [activeColumns, setActiveColumns] = useState([]);

  const data = useMemo(() => {
    return {
      elements,
      setElements,
      activeColumns,
      setActiveColumns,
    };
  }, [elements, setElements, activeColumns, setActiveColumns]);

  const handleButtonClicked = useCallback((e) => {
    setToggleButton(e.target.dataset.type);
  }, []);

  const handleInputChanged = useCallback((e) => {
    const regex = /^[0-9,]*$/;

    if (regex.test(e.target.value) || e.target.value === "") {
      setInput(e.target.value);
    }

    return;
  }, []);

  // const handleOnInputKeyPress = useCallback((e) => {
  //   if (
  //     (e.keyCode < 48 || e.keyCode > 57) & (e.keyCode != 8) &&
  //     e.keyCode != 44
  //   ) {
  //     e.preventDefault();
  //   }
  //   // if (!regex.test(e.target.value)) {
  //   //   e.preventDefault();
  //   // }
  //   // console.log(/^[0-9\b.,]+$/.test(e.target.value));
  //   // // return false;
  //   // return /^[0-9\b.,]+$/.test(e.target.value);
  // }, []);
  return (
    <div>
      <div className="center-div">
        <button className="button-5" role="button" onClick={handleButtonClicked} data-type="selectionSort">
          Selection Sort
        </button>
        <button className="button-5" role="button" onClick={handleButtonClicked} data-type="quickSort">
          Quick Sort
        </button>
        <button className="button-5" role="button" onClick={handleButtonClicked} data-type="mergeSort">
          Merge Sort
        </button>
        <button className="button-5" role="button" onClick={handleButtonClicked} data-type="bubbleSort">
          Bubble Sort
        </button>
        <button className="button-5" role="button" onClick={handleButtonClicked} data-type="heapSort">
          Heap Sort
        </button>
      </div>

      {toggleButton === "selectionSort" && <SortingSelection {...data} />}
      {toggleButton === "quickSort" && <QuickSort {...data} />}
      {toggleButton === "mergeSort" && <MergeSort {...data} />}
      {toggleButton === "bubbleSort" && <SortingBubble {...data} />}
      {toggleButton === "heapSort" && <HeapSort {...data} />}
      <div>
        <input value={input} type="text" onChange={handleInputChanged} />
      </div>
    </div>
  );
};

export default App;

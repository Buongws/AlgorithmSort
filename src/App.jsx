/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect, useCallback } from "react";

import SortingSelection from "./components/SelectionSort";
import SortingBubble from "./components/BubbleSort";
import QuickSort from "./components/QuickSort";
import MergeSort from "./components/MergeSort";
import HeapSort from "./components/HeapSort";

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
      return setInput(e.target.value);
    }

    return;
  }, []);

  const handleOnAutoGenerateButtonClicked = useCallback(() => {
    setElements(Array.from({ length: 15 }, () => Math.floor(Math.random() * 100)));
  }, []);

  useEffect(() => {
    setElements(input.split(",").filter((el) => !!el));
  }, [input]);
  return (
    <div style={{ height: "100vh" }}>
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

      <div className="input-box">
        <div className="webflow-style-input">
          <input type="text" placeholder="Type data..." onChange={handleInputChanged} />
        </div>
        <div>
          <button className="button-49" onClick={handleOnAutoGenerateButtonClicked}>
            Auto generate data
          </button>
        </div>
      </div>

      {toggleButton === "selectionSort" && <SortingSelection {...data} />}
      {toggleButton === "quickSort" && <QuickSort {...data} />}
      {toggleButton === "mergeSort" && <MergeSort {...data} />}
      {toggleButton === "bubbleSort" && <SortingBubble {...data} />}
      {toggleButton === "heapSort" && <HeapSort {...data} />}
    </div>
  );
};

export default App;

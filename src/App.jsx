/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect } from "react";

import SortingSelection from "./Components/SortingSelection";
import SortingBubble from "./Components/SortingBubble";
import QuickSort from "./Components/QuickSort";
import MergeSort from "./Components/MergeSort";

const App = () => {
  let originalData = [
    10, 30, 50, 20, 40, 20, 10, 55, 44, 12, 33, 65, 33, 22, 56, 44, 12, 10,
  ];
  const [elements, setElements] = useState(originalData);
  const [sorting, setSorting] = useState(false);
  const [activeColumns, setActiveColumns] = useState([]);

  const data = useMemo(() => {
    return {
      elements,
      setElements,
      sorting,
      setSorting,
      activeColumns,
      setActiveColumns,
      originalData,
    };
  }, [
    elements,
    setElements,
    sorting,
    setSorting,
    activeColumns,
    setActiveColumns,
    originalData,
  ]);

  return (
    <div>
      {/* <QuickSort {...data} /> */}
      {/* <MergeSort {...data} /> */}
      <SortingSelection {...data} />
      {/* <SortingBubble {...data} /> */}
    </div>
  );
};

export default App;

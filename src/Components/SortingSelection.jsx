/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "../index.css";

const SortingSelection = ({
  elements,
  setElements,
  sorting,
  setSorting,
  activeColumns,
  setActiveColumns,
  originalData,
}) => {
  useEffect(() => {
    if (sorting) {
      bubbleSort();
    }
  }, [sorting]);

  const bubbleSort = async () => {
    // const len = elements.length;

    let currentValueNewIndex;

    for (let i = 0; i < originalData.length; i++) {
      currentValueNewIndex = i;
      for (let j = i + 1; j < originalData.length; j++) {
        setActiveColumns([j, j + 1]);
        if (originalData[currentValueNewIndex] > originalData[j]) {
          currentValueNewIndex = j;
        }
      }
      if (i !== currentValueNewIndex) {
        let temp = originalData[i];
        setActiveColumns([i, currentValueNewIndex]);
        originalData[i] = originalData[currentValueNewIndex];
        originalData[currentValueNewIndex] = temp;
      }
      await sleep(1000);
      setElements([...originalData]);
    }

    setActiveColumns([]);
    setSorting(false);
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
      <div className="sorting-container">
        {elements.map((value, index) => (
          <div
            key={index}
            className={`sorting-element ${
              activeColumns.includes(index) ? "sorting-element-active" : ""
            }`}
            style={{
              height: `${value * 3}px`,
              transition: "height 0.3s ease-in-out",
            }}
          ></div>
        ))}
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

export default SortingSelection;

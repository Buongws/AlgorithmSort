/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "../index.css";

const SortingBubble = ({
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
    const len = elements.length;

    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        setActiveColumns([j, j + 1]);
        if (elements[j] > elements[j + 1]) {
          const temp = elements[j];
          elements[j] = elements[j + 1];
          elements[j + 1] = temp;

          await sleep(200);
          setElements([...elements]);
        }
      }
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
            style={{ height: `${value * 3}px` }}
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

export default SortingBubble;

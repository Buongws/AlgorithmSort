/* eslint-disable react/prop-types */

import BarChart from "./BarChart";

const SortingBubble = ({ elements, setElements, activeColumns, setActiveColumns }) => {
  const bubbleSort = async () => {
    const len = elements.length;

    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        setActiveColumns([j, j + 1]);
        if (elements[j] > elements[j + 1]) {
          const temp = elements[j];
          elements[j] = elements[j + 1];
          elements[j + 1] = temp;

          await sleep(500);
          setElements([...elements]);
        }
      }
    }

    setActiveColumns([]);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSort = () => {
    bubbleSort();
  };

  const handleReset = () => {
    setElements([]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Bubble Sort</h1>
      <BarChart handleReset={handleReset} handleSort={handleSort} elements={elements} activeColumns={activeColumns} />
    </div>
  );
};

export default SortingBubble;

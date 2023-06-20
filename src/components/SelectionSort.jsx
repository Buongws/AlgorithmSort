/* eslint-disable react/prop-types */
import BarChart from "./BarChart";

const SortingSelection = ({ elements, setElements, activeColumns, setActiveColumns }) => {
  const selectionSort = async () => {
    let currentValueNewIndex;

    for (let i = 0; i < elements.length; i++) {
      currentValueNewIndex = i;
      for (let j = i + 1; j < elements.length; j++) {
        setActiveColumns([j, j + 1]);
        if (elements[currentValueNewIndex] > elements[j]) {
          currentValueNewIndex = j;
        }
      }
      if (i !== currentValueNewIndex) {
        let temp = elements[i];
        setActiveColumns([i, currentValueNewIndex]);
        elements[i] = elements[currentValueNewIndex];
        elements[currentValueNewIndex] = temp;
      }
      await sleep(500);
      setElements([...elements]);
    }

    setActiveColumns([]);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSort = () => {
    selectionSort();
  };

  const handleReset = () => {
    setElements([]);
    setActiveColumns([]);
  };

  return (
    <div>
      <h1 className="text-center">Selection Sort</h1>
      <BarChart handleReset={handleReset} handleSort={handleSort} elements={elements} activeColumns={activeColumns} />
    </div>
  );
};

export default SortingSelection;

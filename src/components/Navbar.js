import React from "react";
import "../styles/Navbar.css";

const Navbar = ({
  generateRandomArray,
  startBubbleSort,
  resetPage,
  isSorting,
  isSorted,
  arraySize,
  setArraySize,
  sortingSpeed,
  setSortingSpeed,
}) => {
  return (
    <nav className="navbar">
      {/* Left-aligned heading */}
      <h1>Algorithm Visualizer</h1>

      {/* Centered buttons */}
      <div className="center-buttons">
        <button onClick={startBubbleSort} disabled={isSorting || isSorted}>
          Bubble Sort
        </button>
        <button onClick={resetPage}>Reset</button>
      </div>

      {/* Right-aligned sliders and Generate New Array */}
      <div className="right-container">
        <button onClick={generateRandomArray} disabled={isSorting}>
          Generate New Array
        </button>
        <div className="slider-container">
          <label>
            Array Size: <span>{arraySize}</span>
            <input
              type="range"
              min="10"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
            />
          </label>
          <label>
            Sorting Speed: <span>{sortingSpeed}ms</span>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={500 - sortingSpeed}
              onChange={(e) => setSortingSpeed(500 - Number(e.target.value))}
              disabled={isSorting}
            />
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



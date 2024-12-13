import React from "react";
import "../styles/Navbar.css";

const Navbar = ({ generateRandomArray, startBubbleSort, stopSorting, isSorting, isSorted }) => {
  return (
    <nav className="navbar">
      <h1>Algorithm Visualizer</h1>
      <div className="button-container">
        <button onClick={generateRandomArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={startBubbleSort} disabled={isSorting || isSorted}>
          Bubble Sort
        </button>
        <button onClick={stopSorting} disabled={!isSorting}>
          Stop Sorting
        </button>
      </div>
    </nav>
  );
};

export default Navbar;



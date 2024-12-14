import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import { bubbleSort } from "../algorithms/bubbleSort";
import "../styles/SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30); // Default array size
  const [sortingSpeed, setSortingSpeed] = useState(100); // Default sorting speed
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const timeoutIds = useRef([]);

  const generateRandomArray = () => {
    // Stop all ongoing animations and reset
    timeoutIds.current.forEach((id) => clearTimeout(id)); // Clear all timeouts
    timeoutIds.current = [];
    setIsSorting(false);
    setIsSorted(false);

    // Reset the bar colors
    const allBars = document.getElementsByClassName("bar");
    for (let i = 0; i < allBars.length; i++) {
      allBars[i].style.backgroundColor = "#96f2d7";
    }

    // Generate a new random array
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 700 + 10)
    );
    setArray(newArray);
  };

  const isSortedArray = (array) => {
    if (array.length <= 1) return true;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) return false;
    }
    return true;
  };

  const startBubbleSort = () => {
    if (isSorting || isSorted) return;

    if (isSortedArray(array)) {
      const allBars = document.getElementsByClassName("bar");
      for (let i = 0; i < allBars.length; i++) {
        allBars[i].style.backgroundColor = "#228be6"; // Set sorted color
      }
      console.log("Array is already sorted!");
      return;
    }

    setIsSorting(true);
    timeoutIds.current = [];
    const animations = bubbleSort(array);
    animateSorting(animations, () => {
      setIsSorting(false);
      setIsSorted(true);
    });
  };

  const animateSorting = (animations, onComplete) => {
    animations.forEach((animation, index) => {
      const timeoutId = setTimeout(() => {
        const { type, indices, heights, index: sortedIndex } = animation;

        if (type === "compare") {
          const [barOneIdx, barTwoIdx] = indices;
          const barOne = document.getElementsByClassName("bar")[barOneIdx];
          const barTwo = document.getElementsByClassName("bar")[barTwoIdx];
          barOne.style.backgroundColor = "#ff6b6b"; // Red for comparison
          barTwo.style.backgroundColor = "#ff6b6b";
        } else if (type === "swap") {
          const [barOneIdx, barTwoIdx] = indices;
          const [heightOne, heightTwo] = heights;
          const barOne = document.getElementsByClassName("bar")[barOneIdx];
          const barTwo = document.getElementsByClassName("bar")[barTwoIdx];
          barOne.style.height = `${heightOne}px`;
          barTwo.style.height = `${heightTwo}px`;
          barOne.style.backgroundColor = "#da77f2"; // Purple for swap
          barTwo.style.backgroundColor = "#da77f2";
        } else if (type === "restore") {
          const [barOneIdx, barTwoIdx] = indices;
          const barOne = document.getElementsByClassName("bar")[barOneIdx];
          const barTwo = document.getElementsByClassName("bar")[barTwoIdx];
          barOne.style.backgroundColor = "#96f2d7"; // Reset to teal
          barTwo.style.backgroundColor = "#96f2d7";
        } else if (type === "sorted") {
          const bar = document.getElementsByClassName("bar")[sortedIndex];
          bar.style.backgroundColor = "#228be6"; // Blue for sorted
        }
      }, index * sortingSpeed);

      timeoutIds.current.push(timeoutId);
    });

    const completeTimeout = setTimeout(() => {
      timeoutIds.current = [];
      onComplete();
    }, animations.length * sortingSpeed);
    timeoutIds.current.push(completeTimeout);
  };

  return (
    <div className="sorting-visualizer">
      <Navbar
        generateRandomArray={generateRandomArray}
        startBubbleSort={startBubbleSort}
        resetPage={generateRandomArray} // Reset logic handled by generateRandomArray
        isSorting={isSorting}
        isSorted={isSorted}
        arraySize={arraySize}
        setArraySize={setArraySize}
        sortingSpeed={sortingSpeed}
        setSortingSpeed={setSortingSpeed}
      />
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="bar" key={idx} style={{ height: `${value}px` }}></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;


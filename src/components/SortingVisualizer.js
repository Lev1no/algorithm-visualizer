import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import { bubbleSort } from "../algorithms/bubbleSort";
import "../styles/SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const timeoutIds = useRef([]);

  const generateRandomArray = () => {
    if (isSorting) return;

    const allBars = document.getElementsByClassName("bar");
    for (let i = 0; i < allBars.length; i++) {
      allBars[i].style.backgroundColor = "#96f2d7";
    }
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 700 + 10)
    );
    setArray(newArray);
    setIsSorting(false);
    setIsSorted(false);
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
        allBars[i].style.backgroundColor = "#228be6";
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
          barOne.style.backgroundColor = "#ff6b6b";
          barTwo.style.backgroundColor = "#ff6b6b";
        } else if (type === "swap") {
          const [barOneIdx, barTwoIdx] = indices;
          const [heightOne, heightTwo] = heights;
          const barOne = document.getElementsByClassName("bar")[barOneIdx];
          const barTwo = document.getElementsByClassName("bar")[barTwoIdx];
          barOne.style.height = `${heightOne}px`;
          barTwo.style.height = `${heightTwo}px`;
          barOne.style.backgroundColor = "#da77f2";
          barTwo.style.backgroundColor = "#da77f2";
        } else if (type === "restore") {
          const [barOneIdx, barTwoIdx] = indices;
          const barOne = document.getElementsByClassName("bar")[barOneIdx];
          const barTwo = document.getElementsByClassName("bar")[barTwoIdx];
          barOne.style.backgroundColor = "#96f2d7";
          barTwo.style.backgroundColor = "#96f2d7";
        } else if (type === "sorted") {
          const bar = document.getElementsByClassName("bar")[sortedIndex];
          bar.style.backgroundColor = "#228be6";
        }
      }, index * 100);

      timeoutIds.current.push(timeoutId);
    });

    const completeTimeout = setTimeout(() => {
      timeoutIds.current = [];
      onComplete();
    }, animations.length * 100);
    timeoutIds.current.push(completeTimeout);
  };

  const stopSorting = () => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
    setIsSorting(false);
    console.log("Sorting stopped.");
  };

  return (
    <div className="sorting-visualizer">
      <Navbar
        generateRandomArray={generateRandomArray}
        startBubbleSort={startBubbleSort}
        stopSorting={stopSorting}
        isSorting={isSorting}
        isSorted={isSorted}
      />
      <br></br>
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="bar" key={idx} style={{ height: `${value}px` }}></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;


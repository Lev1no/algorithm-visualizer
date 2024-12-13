import React from "react";
import "./styles/App.css";
import "./styles/Navbar.css";
import Navbar from "./components/Navbar";
import SortingVisualizer from "./components/SortingVisualizer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SortingVisualizer />
    </div>
  );
}

export default App;
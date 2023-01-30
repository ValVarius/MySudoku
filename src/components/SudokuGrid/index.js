import React, { useState, useEffect  } from "react";
import "./style.css";

export default function SudokuGrid({ puzzle }) {
  const [grid, setGrid] = useState(puzzle);

  useEffect(() => {
    setGrid(puzzle)
  }, [puzzle]);

  const handleCellChange = (e, rowIndex, columnIndex) => {
    const newValue = e.target.value;
    setGrid((prevGrid) =>
      prevGrid.map((row, i) =>
        i === rowIndex
          ? row.map((cell, j) => (j === columnIndex ? newValue : cell))
          : row
      )
    );
  };

  return (
    <div className="grid-container">
    {grid.map((row, rowIndex) =>
      row.map((value, columnIndex) => (
        <div key={`${rowIndex}-${columnIndex}`} className="grid-cell">
          {value === null ? (
            <input className = "cellinput" type="text" onChange={(e) => handleCellChange(e, rowIndex, columnIndex)} />
          ) : (
            value
          )}
        </div>
      ))
    )}
  </div>
  );
}







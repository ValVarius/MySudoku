import React, { useState, useEffect } from "react";
import "./style.css";

export default function SudokuGrid({ puzzle }) {
  const [grid, setGrid] = useState(puzzle);

  useEffect(() => {
    setGrid(puzzle);
  }, [puzzle]);

  const handleCellChange = (e, rowIndex, columnIndex) => {
    const newValue = e.target.value.charAt(0);
    // Here handle if text is not an acceptable number
    // newValue.match(/^[0-9]*$/)

    if (newValue.match(/[0-9]/)) {
      setGrid((prevGrid) =>
        prevGrid.map((row, i) =>
          i === rowIndex
            ? row.map((cell, j) =>
                j === columnIndex ? (
                  <input
                    value={newValue}
                    className="cellinput changed"
                    type="text"
                    onChange={(e) => handleCellChange(e, rowIndex, columnIndex)}
                  />
                ) : (
                  cell
                )
              )
            : row
        )
      );
    } else {
      setGrid((prevGrid) =>
        prevGrid.map((row, i) =>
          i === rowIndex
            ? row.map((cell, j) =>
                j === columnIndex ? (
                  <input
                    value={newValue}
                    className="cellinput changed wrong"
                    type="text"
                    onChange={(e) => handleCellChange(e, rowIndex, columnIndex)}
                  />
                ) : (
                  cell
                )
              )
            : row
        )
      );
    }
  };
  const handleClick = () => {
    window.print();
  };
  return (
    <>
      <div className="grid-container">
        {grid.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`} className="grid-cell">
              {value === null ? (
                <input
                  value={value}
                  className="cellinput"
                  type="text"
                  onChange={(e) => handleCellChange(e, rowIndex, columnIndex)}
                />
              ) : (
                value
              )}
            </div>
          ))
        )}
      </div>
      <button className="button"  onClick={handleClick}>Print Sudoku</button>
    </>
  );
}

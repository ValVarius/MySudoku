import React, { useState } from 'react';
import "./style.css"

function SudokuGrid({ puzzle }) {
  const [grid, setGrid] = useState(puzzle);

  return (
    <div className="sudoku-grid">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div key={j} className={`cell ${(i < 3 || i > 5) && (j < 3 || j > 5) ? "bold" : ""}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SudokuGrid;

import React, { useState, useEffect } from "react";
import "./style.css";

export default function SudokuGrid({ puzzle, difficulty, solution }) {
  const [grid, setGrid] = useState(puzzle);
  const [userSoulution, setUserSoulution] = useState(puzzle);
  const [color, setColor] = useState("red");

  useEffect(() => {
    setGrid(puzzle);
    if (difficulty == 35) {
      setColor("rgb(203, 242, 222)");
    } else if (difficulty == 40) {
      setColor("rgb(169, 215, 228)");
    } else if (difficulty == 45) {
      setColor("rgb(230, 242, 203)");
    } else if (difficulty == 50) {
      setColor("rgb(239, 233, 172)");
    } else if (difficulty == 55) {
      setColor("rgb(237, 189, 179)");
    }
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
  const checkSolution = () => {
    console.log("solution:", solution);
    // code to check the solution and the puzzle are identical
    const arraysAreEqual = (array1, array2) => {
      if (array1.length !== array2.length) {
        return false;
      }

      for (var i = 0; i < array1.length; i++) {
        if (array1[i].length !== array2[i].length) {
          return false;
        }
        for (var j = 0; j < array1[i].length; j++) {
          if (array1[i][j] !== array2[i][j]) {
            return false;
          }
        }
      }

      return true;
    };
    console.log(grid);
    console.log(arraysAreEqual(solution, puzzle));
  };
  return (
    <>
      <div className="grid-container" id="grid">
        {grid.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`} className="grid-cell">
              {value === null ? (
                <input
                  value={value}
                  className="cellinput"
                  type="text"
                  style={{ backgroundColor: color }}
                  onChange={(e) => handleCellChange(e, rowIndex, columnIndex)}
                />
              ) : (
                value
              )}
            </div>
          ))
        )}
      </div>
      <div className="topbottombuttons">
        <button className="button" id="print" onClick={handleClick}>
          Print Sudoku
        </button>
        <button className="button" id="verify" onClick={checkSolution}>
          Verify Sudoku
        </button>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { shuffle } from "lodash";
import SudokuGrid from "../SudokuGrid";

import "./style.css";

export default function SudokuGenerator() {
  const [puzzle, setPuzzle] = useState(null);

  function generatePuzzle() {
    const puzzle = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null));

    function canPlace(x, y, num) {
      //Checking whether we can place the number num in the position x, y
      // Checking in the same column
      for (let i = 0; i < 9; i++) {
        if (puzzle[i][y] === num) {
          return false;
        }
      }
      // Checking in the same row
      for (let i = 0; i < 9; i++) {
        if (puzzle[x][i] === num) {
          return false;
        }
      }
      // Checking in the same 3x3 matrix
      const startRow = Math.floor(x / 3) * 3;
      const startCol = Math.floor(y / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (puzzle[i][j] === num) {
            return false;
          }
        }
      }
      return true;
    }

    function solve(puzzle) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (puzzle[i][j] == null) {
            const randomNumbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            for (let num of randomNumbers) {
              if (canPlace(i, j, num)) {
                puzzle[i][j] = num;
                if (solve(puzzle)) {
                  return true;
                }
                puzzle[i][j] = null;
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    solve(puzzle);
    setPuzzle(puzzle);
    // remove some of the numbers to create the final puzzle.You can change the number of blank spaces by adjusting the number of iterations in the following line.
    for (let i = 0; i < 50; i++) {
      const x = Math.floor(Math.random() * 9);
      const y = Math.floor(Math.random() * 9);
      puzzle[x][y] = null;
    }
  }
  function checkSolution(solution) {
    console.log("solution:", solution);
    // code to check the solution
  }


  return (
    <div>
      <button className="button" onClick={generatePuzzle}>
        Generate Puzzle
      </button>
      {/* {puzzle && <div>{puzzle}</div>} */}
      {puzzle ? <SudokuGrid puzzle={puzzle} /> : ""}
    </div>
  );
}

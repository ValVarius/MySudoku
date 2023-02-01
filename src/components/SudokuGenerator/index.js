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
    function solveSudoku(grid) {
      let rows = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
      let columns = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
      let boxes = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
      let emptyCells = [];
      let solutions = [];
    
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (grid[i][j] === null) {
            emptyCells.push([i, j]);
          } else {
            let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            let num = grid[i][j];
            rows[i][num] = columns[j][num] = boxes[boxIndex][num] = true;
          }
        }
      }
    
      function backtrack(index) {
        if (index === emptyCells.length) {
          solutions.push(grid.map((row) => row.slice()));
          return;
        }
        let [row, col] = emptyCells[index];
        let boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        for (let num = 1; num <= 9; num++) {
          if (!rows[row][num] && !columns[col][num] && !boxes[boxIndex][num]) {
            grid[row][col] = num.toString();
            rows[row][num] = columns[col][num] = boxes[boxIndex][num] = true;
            backtrack(index + 1);
            grid[row][col] = null;
            rows[row][num] = columns[col][num] = boxes[boxIndex][num] = false;
          }
        }
      }
    
      backtrack(0);
      return solutions;
    }

    const removeCells = (unsolved, n) => {
      while (n > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (unsolved[row][col] === null) continue;

        const temp = unsolved[row][col];

        unsolved[row][col] = null;
        console.log(solveSudoku(unsolved).length);

        if (solveSudoku(unsolved).length > 1) {
          console.log(solveSudoku(unsolved).length);
          console.log("not unique");
          unsolved[row][col] = temp;
          continue;
        }
        n--;
      }

      return unsolved;
    };

    solve(puzzle);
    setPuzzle(puzzle);
    // 55 seems to be the current limit for a decent timing
    removeCells(puzzle, 55);
    console.log(puzzle);
  }

  return (
    <div>
      <button className="button" onClick={generatePuzzle}>
        Generate Puzzle
      </button>
      {puzzle ? <SudokuGrid puzzle={puzzle} /> : ""}
    </div>
  );
}

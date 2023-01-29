import React, { useState } from "react";

export default function SudokuForm({ puzzle, onSubmit }) {
  const [solution, setSolution] = useState(Array(9).fill(Array(9).fill("")));

  function handleChange(e, i, j) {
    const newSolution = solution.slice();
    newSolution[i][j] = e.target.value;
    setSolution(newSolution);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(solution);
  }
  return (
    <form onSubmit={handleSubmit}>
      {puzzle.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <input
              key={j}
              type="text"
              value={solution[i][j]}
              onChange={(e) => handleChange(e, i, j)}
            //   disabled={cell !== ""}
            />
          ))}
        </div>
      ))}
      <button type="submit">Check Solution</button>
    </form>
  );
}

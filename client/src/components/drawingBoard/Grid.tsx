import { useState } from "react";

const ROWS = 32;
const COLS = 32;

export default function Grid() {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill("bg-white"))
  );

  return (
    <ul className="grid grid-col-32 grid-rows-32 grid-flow-col size-[48rem]">
      {grid?.map((row, i) => {
        return row.map((color, j) => {
          return (
            <li
              key={`${i * 10}+${j}`}
              className={`${color} border-1 border-black hover:bg-slate-400`}
            ></li>
          );
        });
      })}
    </ul>
  );
}

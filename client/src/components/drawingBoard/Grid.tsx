import { trpc } from "@/trpc";
import { BASE_COLOR } from "@/utils/colors";
import convertTailwindToHex from "@/utils/convertTailwindToHex";
import { useState } from "react";

const ROWS = 32;
const COLS = 32;

export default function Grid({
  selectedColor = "bg-blue-500",
  defaultGrid,
  debug = true,
}: {
  selectedColor?: string;
  defaultGrid?: string[][];
  debug?: boolean;
}) {
  const [grid, setGrid] = useState<string[][]>(
    defaultGrid ||
      Array.from({ length: ROWS }, () => Array(COLS).fill(BASE_COLOR))
  );
  const [hoveredCell, setHoveredCell] = useState<[number, number]>([0, 0]);
  const [handleGridUpdate, setHandleGridUpdate] = useState<boolean>(false);

  const mutation = trpc.grid.addGrid.useMutation();

  const updateGrid = (cell: [number, number]) => {
    setHoveredCell(cell);
    if (handleGridUpdate) {
      const newGrid = grid.map((row, rowIDX) => {
        if (rowIDX === hoveredCell[0]) {
          return row.map((color, colIDX) => {
            if (colIDX === hoveredCell[1]) {
              return selectedColor;
            }
            return color;
          });
        }
        return row;
      });
      setGrid(newGrid);
    }
  };

  const clearBoard = () => {
    const clear = Array.from({ length: ROWS }, () =>
      Array(COLS).fill(BASE_COLOR)
    );

    setGrid(clear);
  };

  const uploadBoard = () => {
    const hexGrid = convertTailwindToHex(grid);

    mutation.mutate({
      tailwindColors: grid,
      hexColors: hexGrid,
    });
  };

  return (
    <section>
      {debug && (
        <span>
          x: {hoveredCell[0]} y: {hoveredCell[1]}
        </span>
      )}
      <ul
        className="grid grid-col-32 grid-rows-32 grid-flow-col size-[48rem] cursor-pointer"
        onMouseDown={() => setHandleGridUpdate(true)}
        onMouseUp={() => setHandleGridUpdate(false)}
      >
        {grid?.map((row, i) => {
          return row.map((color, j) => {
            return (
              <li
                key={`${i * 10}+${j}`}
                className={`${color} border-1 border-black hover:bg-slate-400`}
                onMouseOver={() => updateGrid([i, j])}
              ></li>
            );
          });
        })}
      </ul>
      <div>
        <button
          className="px-2 py-1 rounded-lg border-2 hover:bg-sky-200 cursor-pointer"
          onClick={() => clearBoard()}
        >
          Clear Board
        </button>
        <button
          className="px-2 py-1 rounded-lg border-2 hover:bg-sky-200 cursor-pointer"
          onClick={() => uploadBoard()}
        >
          Upload
        </button>
      </div>
    </section>
  );
}

import { BASE_COLOR } from "@/utils/colors";
import { useEffect, useRef, useState } from "react";

const ROWS = 32;
const COLS = 32;

const rgbaToHex = (r: number, g: number, b: number, a: number) => {
  return (
    "#" +
    [r, g, b, a]
      .map((val) => val.toString(16))
      .map((strVal) => (strVal.length === 1 ? "0" + strVal : strVal))
      .join("")
  );
};

export default function Grid({
  selectedColor = BASE_COLOR.hexColor,
}: {
  selectedColor?: string;
  defaultGrid?: string[][];
  debug?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mouseCoordinates, setMouseCoordinates] = useState<number[]>([-1, -1]);

  const indexHandler = (a: number, b: number): number => Math.floor(a / b);

  const handleMouseUp = () => {
    setMouseDown(false);
    setMouseCoordinates([-1, -1]);
  };

  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mouseDown) {
      paint(e);
    }
  };

  const handleClearBoard = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = BASE_COLOR.hexColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleUpload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const hexValues = [];
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i <= data.length - 1; i += 4) {
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];
          const alpha = data[i + 3];

          hexValues.push(rgbaToHex(red, green, blue, alpha));
        }
        console.log(hexValues);
      }
    }
  };

  const paint = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const target = e.target as Element;
        const rect = target.getBoundingClientRect();

        const x = indexHandler(
          (e.pageX - canvas.offsetLeft) * canvas.width,
          rect.width
        );
        const y = indexHandler(
          (e.pageY - canvas.offsetTop) * canvas.height,
          rect.height
        );
        if (x !== mouseCoordinates[0] || y !== mouseCoordinates[1]) {
          setMouseCoordinates([x, y]);
          ctx.save();
          ctx.fillStyle = selectedColor;
          ctx.fillRect(x, y, 1, 1);
          ctx.restore();
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return (
    <section>
      <canvas
        ref={canvasRef}
        width={COLS}
        height={ROWS}
        className={`border-2 w-[42rem] h-[42rem]`}
        style={{
          imageRendering: "pixelated",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
      <div>
        <button onClick={handleClearBoard}>Clear</button>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </section>
  );
}

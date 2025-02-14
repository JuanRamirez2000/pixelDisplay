import { BASE_COLOR } from "@/utils/colors";
import { useEffect, useRef, useState } from "react";

const ROWS = 32;
const COLS = 32;

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
    </section>
  );
}

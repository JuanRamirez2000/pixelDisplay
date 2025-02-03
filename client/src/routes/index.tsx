import { createFileRoute } from "@tanstack/react-router";
import Board from "@/components/drawingBoard/Board";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Board />
    </div>
  );
}

import { useState } from "react";
import { BASE_COLOR } from "@/utils/colors";
import Grid from "./Grid";
import ColorPicker from "./ColorPicker";
import testData from "@/utils/testData";

export default function Board() {
  const [selectedColor, setSelectedColor] = useState<string>(
    BASE_COLOR.hexColor
  );

  return (
    <div className="flex flex-row">
      <Grid
        selectedColor={selectedColor}
        defaultGrid={testData[0].tailwindGrid}
      />
      <ColorPicker setSelectedColor={setSelectedColor} />
    </div>
  );
}

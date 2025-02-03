import { useState } from "react";
import { BASE_COLOR } from "@/utils/colors";
import Grid from "./Grid";
import ColorPicker from "./ColorPicker"

export default function Board() {
  const [selectedColor, setSelectedColor] = useState<string>(BASE_COLOR);

  return (
    <div className="flex flex-row">
      <Grid selectedColor={selectedColor}/>
      <ColorPicker setSelectedColor={setSelectedColor}/>
    </div>
  );
}

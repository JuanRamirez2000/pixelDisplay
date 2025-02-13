import { type COLOR_PAIR, COLOR_PALETTE } from "@/utils/colors";

export default function ColorPicker({
  setSelectedColor,
}: {
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <section>
      <ul className="grid grid-flow-row grid-cols-3 gap-1 p-2 border-2 shadow-xl border-slate-400 grid-rows-12 h-fit w-fit">
        {COLOR_PALETTE.map((colorPair: COLOR_PAIR) => {
          return (
            <li
              className={`${colorPair.tailwindColor} flex items-center justify-center duration-150 border-2 cursor-pointer size-16 border-slate-950 hover:scale-105`}
              key={colorPair.tailwindColor}
              onClick={() => setSelectedColor(colorPair.hexColor)}
            >
              <span className="p-2 "></span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

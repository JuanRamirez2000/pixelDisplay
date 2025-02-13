import { COLOR_PALETTE } from "@/utils/colors";

export default function ColorPicker({
  setSelectedColor,
}: {
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <section>
      <ul className="grid grid-flow-row grid-cols-3 gap-1 p-2 border-2 shadow-xl border-slate-400 grid-rows-12 h-fit w-fit">
        {COLOR_PALETTE.map((color) => {
          return (
            <li
              className={`${color} flex items-center justify-center duration-150 border-2 cursor-pointer size-16 border-slate-950 hover:scale-105`}
              key={color}
              onClick={() => setSelectedColor(color)}
            >
              <span className="p-2 "></span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

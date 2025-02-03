import Color from "colorjs.io";

export default function convertTailwindToHex(grid: string[][]) {
  const styles = getComputedStyle(document.documentElement);
  const gridHex = grid.map((row) =>
    row.map((tailwindColor) => {
      const oklch = styles.getPropertyValue(
        tailwindColor.replace("bg", "--color")
      );
      const hex = new Color(oklch)
        .toGamut({ space: "srgb" })
        .to("srgb")
        .toString({ format: "hex" });
      return hex;
    })
  );
  return gridHex;
}

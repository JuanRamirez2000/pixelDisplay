import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { gridsTable } from "../db/schema";

export const ColorGridRouter = router({
  getGrids: publicProcedure.query(async ({ ctx }) => {
    const grids = await ctx.db.select().from(gridsTable);
    return grids;
  }),
  addGrid: publicProcedure
    .input(
      z.object({
        tailwindColors: z.array(z.array(z.string())),
        hexColors: z.array(z.array(z.string())),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const flatTailwindColors = input.tailwindColors.flat();
      const flatHexColors = input.hexColors.flat();

      return await ctx.db.insert(gridsTable).values({
        tailwindColorsGrid: flatTailwindColors,
        hexColorsGrid: flatHexColors,
        dateSubmitted: new Date().toISOString(),
      });
    }),
});

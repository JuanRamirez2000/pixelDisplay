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
        hexColors: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const flatHexColors = input.hexColors.flat();

      return await ctx.db.insert(gridsTable).values({
        hexColorsGrid: flatHexColors,
        dateSubmitted: new Date().toISOString(),
      });
    }),
});

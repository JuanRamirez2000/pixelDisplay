import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { gridsTable } from "../db/schema";
import { drizzle } from "drizzle-orm/postgres-js";


export const ColorGridRouter = router({
  getGrids: publicProcedure.query(async () => {
    const db = drizzle(process.env.DATABASE_URL!);
    const grids = await db.select().from(gridsTable);
    console.log(grids);
    return grids;
  }),
});

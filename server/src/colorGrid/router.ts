import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import { grids } from "./db";
import { ColorGrid } from "./types";

export const ColorGridRouter = router({
  getGrids: publicProcedure.query(() => {
    return grids;
  }),
});

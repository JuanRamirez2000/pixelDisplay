import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import { grids } from "./db";
import { ColorGrid } from "./types";

export const ColorGridRouter = router({
  getUsers: publicProcedure.query(() => {
    return grids;
  }),
  getUserById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      const user = grids.find((grid) => grid.id === input);

      return user;
    }),
});

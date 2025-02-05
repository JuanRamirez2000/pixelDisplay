import { router } from "./trpc";
import { ColorGridRouter } from "./colorGrid/router";

export const appRouter = router({
  grid: ColorGridRouter,
});

export type AppRouter = typeof appRouter;

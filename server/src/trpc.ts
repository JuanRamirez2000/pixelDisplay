import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

// Context used in API Routes
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {};
};

// Router and tRPC initialization to use for later
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;

/**
 * Public procedures
 **/
export const publicProcedure = t.procedure;

export type Context = Awaited<ReturnType<typeof createContext>>;

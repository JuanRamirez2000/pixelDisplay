import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

// Context used in API Routes
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });
  return {
    db,
  };
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

import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { createContext } from "./trpc";

const app = express();

// Constants
const PORT = 4000;
const HOST = "0.0.0.0";

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

console.log(process.env.DATABASE_URL);

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

const DATABASE_URL: string = process.env.DATABASE_URL!;
console.log(DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL!,
  },
});

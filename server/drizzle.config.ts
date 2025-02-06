import "dotenv";
import { defineConfig } from "drizzle-kit";

const DATABASE_URL: string = process.env.DATABASE!;
console.log(DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL!,
  },
});

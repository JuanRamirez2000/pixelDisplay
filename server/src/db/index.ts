import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

async function main() {
  const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

  const client = postgres(DATABASE_URL!);
  const db = drizzle({ client });
}

main();

import { date, integer, pgTable, text } from "drizzle-orm/pg-core";

export const gridsTable = pgTable("grids", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tailwindColorsGrid: text().array(),
  hexColorsGrid: text().array(),
  dateSubmitted: date(),
});

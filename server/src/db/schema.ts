import { date, integer, pgTable, text } from "drizzle-orm/pg-core";

export const gridsTable = pgTable("grids", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  hexColorsGrid: text().array(),
  dateSubmitted: date(),
});

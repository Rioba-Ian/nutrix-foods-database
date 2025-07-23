import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

/*
ktc_nutrient_code: The unique nutrient code from the KFTC.
abbreviation: Common abbreviation for the nutrient (e.g., "PROT" for Protein).
analysis_method: Method used for nutrient analysis (e.g., "HPLC", "Colorimetric").
*/

export const nutrientsTable = pgTable("nutrients", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 kftc_nutrient_code: varchar({ length: 20 }).unique().notNull(),
 abbreviation: varchar({ length: 20 }).unique().notNull(),
 analysis_method: varchar({ length: 100 }).notNull(),
});

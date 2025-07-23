import { integer, pgTable, varchar, text, date } from "drizzle-orm/pg-core";

/*
nutrient_units 
unit_id: The unique identifier for the nutrient unit.
unit_name: The name of the nutrient unit (e.g., "mg", "g",
sumbol: The symbol for the nutrient unit (e.g., "mg", "g").
*/

export const nutrientUnitsTable = pgTable("nutrient_units", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 unit_name: varchar({ length: 20 }).notNull(),
 symbol: varchar({ length: 10 }).notNull(),
});

/*
Foods 
ktfc_food_code: The unique code for the food item from the KFTC.
scientific_name: The scientific name of the food item.
food_group: The group to which the food item belongs (e.g., "Fruits", "Vegetables").
food_subgroup: The subgroup of the food item (e.g., "Citrus", "Leafy Greens").
food_form: The form of the food item (e.g., "Raw", "Cooked").
edible_portion_factor: The proportion of the food that is edible (e.g., 0.85).
common_preparation: How this food is typically prepared if it impacts its form/nutrients.
*/

export const foodsTable = pgTable("foods", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 ktfc_food_code: varchar({ length: 20 }).unique().notNull(),
 scientific_name: varchar({ length: 100 }).notNull(),
 description: text().notNull(),
 food_group: varchar({ length: 50 }).notNull(),
 food_subgroup: varchar({ length: 50 }).notNull(),
 food_form: varchar({ length: 50 }).notNull(),
 edible_portion_factor: integer().notNull(),
 common_preparation: varchar({ length: 100 }).notNull(),
 image_url: varchar(),
 date_added: date().notNull().defaultNow(),
 date_modified: date().notNull().defaultNow(),
});

/*
ktc_nutrient_code: The unique nutrient code from the KFTC.
abbreviation: Common abbreviation for the nutrient (e.g., "PROT" for Protein).
analysis_method: Method used for nutrient analysis (e.g., "HPLC", "Colorimetric").
*/

export const nutrientsTable = pgTable("nutrients", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 kftc_nutrient_code: varchar({ length: 20 }).unique().notNull(),
 abbreviation: varchar({ length: 20 }).unique().notNull(),
 nutrient_name: varchar({ length: 100 }).notNull(),
 description: varchar({ length: 255 }).notNull(),
 default_unit_id: integer().notNull(),
 rdi: integer().notNull(),
 analysis_method: varchar({ length: 100 }).notNull(),

 nutrient_unit_id: integer()
  .notNull()
  .references(() => nutrientUnitsTable.id, {
   onDelete: "cascade",
   onUpdate: "cascade",
  }),
});

/*
Food Nutrients 
number_of_samples: The number of samples used to derive the value (from KFTC 'N' column)
standard_deviation: The standard deviation of the nutrient value (from KFTC 'SD' column)
min_value: Minimum value observed the 
);
*/

export const foodsNutrientsTable = pgTable("foods_nutrients", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 serving_size: integer().notNull(),
 number_of_samples: integer().notNull(),
 standard_deviation: integer().notNull(),
 min_value: integer().notNull(),
 max_value: integer().notNull(),
 data_source: varchar({ length: 255 }).notNull(),
 data_date: date().notNull(),
 data_quality_flag: varchar({ length: 50 }).notNull(),
 created_at: date().notNull().defaultNow(),
 updated_at: date().notNull().defaultNow(),

 food_id: integer()
  .notNull()
  .references(() => foodsTable.id, {
   onDelete: "cascade",
   onUpdate: "cascade",
  }),
 nutrient_id: integer()
  .notNull()
  .references(() => nutrientsTable.id, {
   onDelete: "cascade",
   onUpdate: "cascade",
  }),
 nutrient_unit_id: integer()
  .notNull()
  .references(() => nutrientUnitsTable.id, {
   onDelete: "cascade",
   onUpdate: "cascade",
  }),
});

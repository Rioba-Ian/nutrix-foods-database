CREATE TABLE "foods_nutrients" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "foods_nutrients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"serving_size" integer NOT NULL,
	"number_of_samples" integer NOT NULL,
	"standard_deviation" integer NOT NULL,
	"min_value" integer NOT NULL,
	"max_value" integer NOT NULL,
	"data_source" varchar(255) NOT NULL,
	"data_date" date NOT NULL,
	"data_quality_flag" varchar(50) NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"food_id" integer NOT NULL,
	"nutrient_id" integer NOT NULL,
	"nutrient_unit_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "foods" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "foods_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"ktfc_food_code" varchar(20) NOT NULL,
	"scientific_name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"food_group" varchar(50) NOT NULL,
	"food_subgroup" varchar(50) NOT NULL,
	"food_form" varchar(50) NOT NULL,
	"edible_portion_factor" integer NOT NULL,
	"common_preparation" varchar(100) NOT NULL,
	"image_url" varchar,
	"date_added" date DEFAULT now() NOT NULL,
	"date_modified" date DEFAULT now() NOT NULL,
	CONSTRAINT "foods_ktfc_food_code_unique" UNIQUE("ktfc_food_code")
);
--> statement-breakpoint
CREATE TABLE "nutrient_units" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "nutrient_units_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"unit_name" varchar(20) NOT NULL,
	"symbol" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrients" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "nutrients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"kftc_nutrient_code" varchar(20) NOT NULL,
	"abbreviation" varchar(20) NOT NULL,
	"nutrient_name" varchar(100) NOT NULL,
	"description" varchar(255) NOT NULL,
	"default_unit_id" integer NOT NULL,
	"rdi" integer NOT NULL,
	"analysis_method" varchar(100) NOT NULL,
	"nutrient_unit_id" integer NOT NULL,
	CONSTRAINT "nutrients_kftc_nutrient_code_unique" UNIQUE("kftc_nutrient_code"),
	CONSTRAINT "nutrients_abbreviation_unique" UNIQUE("abbreviation")
);
--> statement-breakpoint
ALTER TABLE "foods_nutrients" ADD CONSTRAINT "foods_nutrients_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "foods_nutrients" ADD CONSTRAINT "foods_nutrients_nutrient_id_nutrients_id_fk" FOREIGN KEY ("nutrient_id") REFERENCES "public"."nutrients"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "foods_nutrients" ADD CONSTRAINT "foods_nutrients_nutrient_unit_id_nutrient_units_id_fk" FOREIGN KEY ("nutrient_unit_id") REFERENCES "public"."nutrient_units"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "nutrients" ADD CONSTRAINT "nutrients_nutrient_unit_id_nutrient_units_id_fk" FOREIGN KEY ("nutrient_unit_id") REFERENCES "public"."nutrient_units"("id") ON DELETE cascade ON UPDATE cascade;
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(80) UNIQUE NOT NULL,
	"password" varchar(1000) NOT NULL,
	"email" varchar(100) UNIQUE,
	"profile_pic" varchar(300) 
);

CREATE TABLE "plant" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "plant_name" varchar(100) NOT NULL,
    "scientific_name" varchar(150),
    "plant_image" varchar(300) NOT NULL,
    "care" TEXT NOT NULL,
    "soil_type" varchar(60),
    "water" integer NOT NULL
);

CREATE TABLE "follower" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"
    "follower_id" INT REFERENCES "user"
);

-- Test plant
INSERT INTO "plant" ("user_id", "plant_name", "scientific_name", "plant_image", "care", "soil_type", "water")
VALUES (1, 'Snake Plant', 'Sansevieria trifasciata', 'snake_plant.jpg', 'Requires indirect sunlight. Allow soil to dry between waterings.', 'Well-draining soil', 14);

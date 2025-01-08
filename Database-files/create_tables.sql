CREATE TABLE "word"(
                       "id" SERIAL NOT NULL PRIMARY KEY,
                       "name" VARCHAR(255) NOT NULL UNIQUE,
                       "correct_guess" BOOLEAN NOT NULL DEFAULT '0',
                       "hint" VARCHAR(255) NOT NULL,
                       "subject_id" INTEGER NOT NULL,
                       CONSTRAINT fk_subject FOREIGN KEY("subject_id") REFERENCES "subject"("id"));

CREATE TABLE "subject"(
                          "id" SERIAL NOT NULL PRIMARY KEY,
                          "name" VARCHAR(255) NOT NULL);


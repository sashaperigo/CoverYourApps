-- Run "heroku pg:psql < database/heroku-setup.sql"
DROP TABLE IF EXISTS test;
CREATE TABLE test(name TEXT);
INSERT INTO test(name) VALUES ('Alec'),('Shirin'),('Sasha'),('Emily'),('Gabbi');
SELECT * FROM test;

DROP TABLE IF EXISTS track;
CREATE TABLE track(resource TEXT, behavior TEXT);

DROP TABLE IF EXISTS session;
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

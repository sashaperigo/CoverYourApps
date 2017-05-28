#!/usr/bin/env bash

/Applications/Postgres.app/Contents/Versions/latest/bin/createdb coveryourapps
/Applications/Postgres.app/Contents/Versions/latest/bin/createuser cya
/Applications/Postgres.app/Contents/Versions/latest/bin/psql -U cya -d \
  coveryourapps -c "DROP TABLE IF EXISTS test;
                    CREATE TABLE test(name TEXT);
                    INSERT INTO test(name) VALUES ('Alec'),('Shirin'),('Sasha'),('Emily'),('Gabbi');
                    SELECT * FROM test;"

/Applications/Postgres.app/Contents/Versions/latest/bin/psql -U cya -d \
  coveryourapps -c "DROP TABLE IF EXISTS track;
                    CREATE TABLE track(sessionID TEXT, resource TEXT, behavior TEXT);"

  /Applications/Postgres.app/Contents/Versions/latest/bin/psql -U cya -d \
    coveryourapps < ./database/session.sql

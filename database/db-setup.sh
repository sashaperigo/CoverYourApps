#!/usr/bin/env bash

/Applications/Postgres.app/Contents/Versions/latest/bin/createdb coveryourapps
/Applications/Postgres.app/Contents/Versions/latest/bin/createuser cya
/Applications/Postgres.app/Contents/Versions/latest/bin/psql -U cya -d \
  coveryourapps -c "CREATE TABLE test(name text);
                    INSERT INTO test(name) VALUES ('Alec'),('Shirin'),('Sasha'),('Emily'),('Gabbi');
                    SELECT * FROM test;"

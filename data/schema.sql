DROP TABLE IF EXISTS entrancetab;
CREATE TABLE entrancetab(
   id SERIAL PRIMARY KEY,
    type VARCHAR (255),
    setup VARCHAR (255),
    punchline VARCHAR (255)
);
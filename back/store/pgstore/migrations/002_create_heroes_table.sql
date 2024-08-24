CREATE TABLE IF NOT EXISTS heroes (
    "id"            uuid            PRIMARY KEY     NOT NULL    DEFAULT gen_random_uuid(),
    "name"          VARCHAR(255)                    NOT NULL,
    "rank"          VARCHAR(255)                    NOT NULL,
    "image_url"     VARCHAR(255)                    NOT NULL
);

---- create above / drop below ----

DROP TABLE IF EXISTS heroes;

CREATE TABLE 'category' (
    'categoryid' INTEGER NOT NULL PRIMARY KEY,
    'name' TEXT NOT NULL,
    'color' TEXT NOT NULL
)

CREATE TABLE 'events' (
    'eventid' INTEGER NOT NULL PRIMARY KEY,
    'date' TEXT NOT NULL,
    'title' TEXT NOT NULL,
    'description' BLOB,
    'categoryid' INTEGER
);

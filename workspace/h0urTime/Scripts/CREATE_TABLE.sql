CREATE TABLE 'events' (
	'id' INTEGER NOT NULL PRIMARY KEY,
	'datestart' DATETIME NOT NULL,
	'datestop' DATETIME NOT NULL,
	'title' TEXT NOT NULL,
	'description' BLOB,
	'category' TEXT NOT NULL
);
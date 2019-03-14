BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Corrections" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"original"	TEXT,
	"translation"	TEXT,
	"improved_translation"	TEXT,
	"created_at"	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
	"name"	VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY("name")
);
INSERT INTO "Corrections" VALUES (1,'tigtig, tig, tih, tig','english english','aaaaaaa','Thu Mar 14 2019','Thu Mar 14 2019');
INSERT INTO "Corrections" VALUES (2,'tigtiTESTTEST','english english more english','bbbbbb','Thu Mar 14 2019','Thu Mar 14 2019');
INSERT INTO "SequelizeMeta" VALUES ('20190314051019-create-corrections.js');
COMMIT;

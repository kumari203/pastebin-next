-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "maxViews" INTEGER,
    "views" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Paste" ("content", "createdAt", "id") SELECT "content", "createdAt", "id" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

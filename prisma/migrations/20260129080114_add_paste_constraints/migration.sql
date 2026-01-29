/*
  Warnings:

  - You are about to drop the column `views` on the `Paste` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    "maxViews" INTEGER,
    "viewCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Paste" ("content", "createdAt", "expiresAt", "id", "maxViews") SELECT "content", "createdAt", "expiresAt", "id", "maxViews" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

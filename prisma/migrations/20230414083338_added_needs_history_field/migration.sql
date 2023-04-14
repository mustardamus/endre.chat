-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Filter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "needsHistory" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Filter" ("createdAt", "description", "id", "name", "prompt", "updatedAt") SELECT "createdAt", "description", "id", "name", "prompt", "updatedAt" FROM "Filter";
DROP TABLE "Filter";
ALTER TABLE "new_Filter" RENAME TO "Filter";
CREATE UNIQUE INDEX "Filter_name_key" ON "Filter"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

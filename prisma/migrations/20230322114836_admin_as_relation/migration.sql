/*
  Warnings:

  - You are about to drop the column `adminUserId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "topicOriginal" TEXT,
    "topicFiltered" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "adminId" INTEGER NOT NULL,
    "filterId" INTEGER NOT NULL,
    CONSTRAINT "Room_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Room_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "Filter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Room" ("createdAt", "filterId", "id", "name", "topicFiltered", "topicOriginal", "updatedAt") SELECT "createdAt", "filterId", "id", "name", "topicFiltered", "topicOriginal", "updatedAt" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

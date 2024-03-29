/*
  Warnings:

  - Added the required column `ipHash` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contentOriginal" TEXT NOT NULL,
    "contentFiltered" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "tokensUsed" INTEGER NOT NULL,
    "modelUsed" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("contentFiltered", "contentOriginal", "createdAt", "id", "modelUsed", "roomId", "tokensUsed", "updatedAt", "userId") SELECT "contentFiltered", "contentOriginal", "createdAt", "id", "modelUsed", "roomId", "tokensUsed", "updatedAt", "userId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

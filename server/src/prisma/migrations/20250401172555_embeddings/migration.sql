/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Embedding` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Embedding` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Embedding" DROP CONSTRAINT "Embedding_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Embedding" DROP CONSTRAINT "Embedding_userId_fkey";

-- AlterTable
ALTER TABLE "Embedding" DROP COLUMN "sessionId",
DROP COLUMN "userId";

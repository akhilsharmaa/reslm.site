/*
  Warnings:

  - You are about to drop the column `body` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "body",
ALTER COLUMN "visiblity" SET DEFAULT 'PRIVATE';

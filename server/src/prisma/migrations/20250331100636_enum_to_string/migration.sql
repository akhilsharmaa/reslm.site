/*
  Warnings:

  - Changed the type of `format` on the `Upload` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Upload" DROP COLUMN "format",
ADD COLUMN     "format" TEXT NOT NULL;

/*
  Warnings:

  - The `texts` column on the `Embedding` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Embedding" DROP COLUMN "texts",
ADD COLUMN     "texts" TEXT[];

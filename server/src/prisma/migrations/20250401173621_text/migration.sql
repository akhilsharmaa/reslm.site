/*
  Warnings:

  - You are about to drop the column `texts` on the `Embedding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Embedding" DROP COLUMN "texts",
ADD COLUMN     "text" TEXT[];

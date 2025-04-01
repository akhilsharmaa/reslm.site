/*
  Warnings:

  - You are about to drop the column `embedding_id` on the `Upload` table. All the data in the column will be lost.
  - Added the required column `upload_id` to the `Embedding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Embedding" ADD COLUMN     "upload_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Upload" DROP COLUMN "embedding_id";

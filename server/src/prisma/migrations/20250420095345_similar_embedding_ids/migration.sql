/*
  Warnings:

  - You are about to drop the column `chunks_list` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "chunks_list",
ADD COLUMN     "similar_embedding_ids" INTEGER[];

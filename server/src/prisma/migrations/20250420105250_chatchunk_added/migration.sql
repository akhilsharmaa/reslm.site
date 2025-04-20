/*
  Warnings:

  - You are about to drop the column `similar_embedding_ids` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "similar_embedding_ids";

-- CreateTable
CREATE TABLE "ChatChunk" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding_id" INTEGER NOT NULL,
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "ChatChunk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatChunk" ADD CONSTRAINT "ChatChunk_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

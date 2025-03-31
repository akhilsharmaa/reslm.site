-- DropForeignKey
ALTER TABLE "Embeddings" DROP CONSTRAINT "Embeddings_session_id_fkey";

-- AlterTable
ALTER TABLE "Embeddings" ALTER COLUMN "session_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Embeddings" ADD CONSTRAINT "Embeddings_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

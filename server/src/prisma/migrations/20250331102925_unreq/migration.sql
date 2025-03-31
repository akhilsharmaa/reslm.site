-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_session_id_fkey";

-- AlterTable
ALTER TABLE "Upload" ALTER COLUMN "session_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

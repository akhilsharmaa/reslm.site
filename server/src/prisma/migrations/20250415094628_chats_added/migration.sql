-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('SYSTEM', 'HUMAN', 'AI', 'THINKING');

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "type" "ChatType" NOT NULL DEFAULT 'SYSTEM',
    "session_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

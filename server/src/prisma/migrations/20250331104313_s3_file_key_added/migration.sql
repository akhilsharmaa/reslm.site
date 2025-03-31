/*
  Warnings:

  - Added the required column `s3FileKey` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "s3FileKey" TEXT NOT NULL;

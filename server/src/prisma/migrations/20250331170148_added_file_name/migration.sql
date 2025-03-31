/*
  Warnings:

  - Added the required column `fileName` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "fileName" TEXT NOT NULL;

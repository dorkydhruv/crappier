/*
  Warnings:

  - Added the required column `userId` to the `ZapRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapRun" ADD COLUMN     "userId" TEXT NOT NULL;

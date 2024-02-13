/*
  Warnings:

  - You are about to drop the column `userId` on the `GoogleAuth` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoogleAuth" DROP CONSTRAINT "GoogleAuth_userId_fkey";

-- AlterTable
ALTER TABLE "GoogleAuth" DROP COLUMN "userId";

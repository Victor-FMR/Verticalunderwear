-- DropIndex
DROP INDEX "GoogleAuth_userId_key";

-- AlterTable
ALTER TABLE "GoogleAuth" ALTER COLUMN "googlePhone" SET DATA TYPE TEXT;

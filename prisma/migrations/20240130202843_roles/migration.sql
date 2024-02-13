-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'MEMBER', 'CLIENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Roles"[];

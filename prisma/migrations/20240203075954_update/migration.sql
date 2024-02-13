/*
  Warnings:

  - Made the column `quantity` on table `ShoppingCart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalPrice` on table `ShoppingCart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ShoppingCart" ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1,
ALTER COLUMN "totalPrice" SET NOT NULL;

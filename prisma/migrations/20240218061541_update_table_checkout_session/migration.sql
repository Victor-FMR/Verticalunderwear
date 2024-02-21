/*
  Warnings:

  - Added the required column `shippingCost` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.
  - Made the column `shippingMethod` on table `CheckoutSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CheckoutSession" ADD COLUMN     "shippingCost" DECIMAL(9,2) NOT NULL,
ADD COLUMN     "totalAmount" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "shippingMethod" SET NOT NULL;

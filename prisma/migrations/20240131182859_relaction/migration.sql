/*
  Warnings:

  - Made the column `shoppingId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shoppingId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "shoppingId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shoppingId_fkey" FOREIGN KEY ("shoppingId") REFERENCES "ShoppingCart"("idShoppingCart") ON DELETE RESTRICT ON UPDATE CASCADE;

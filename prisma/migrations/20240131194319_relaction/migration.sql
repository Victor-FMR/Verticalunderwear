/*
  Warnings:

  - Added the required column `shoppingId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_idProduct_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shoppingId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shoppingId_fkey" FOREIGN KEY ("shoppingId") REFERENCES "ShoppingCart"("idShoppingCart") ON DELETE RESTRICT ON UPDATE CASCADE;

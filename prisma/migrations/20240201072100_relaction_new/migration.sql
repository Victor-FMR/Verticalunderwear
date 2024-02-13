/*
  Warnings:

  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shoppingId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ShoppingCart` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `ShoppingCart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shoppingId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "orderId",
DROP COLUMN "shoppingId",
ADD COLUMN     "shoppingCartId" UUID;

-- AlterTable
ALTER TABLE "ShoppingCart" DROP COLUMN "quantity",
DROP COLUMN "totalPrice";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart"("idShoppingCart") ON DELETE SET NULL ON UPDATE CASCADE;

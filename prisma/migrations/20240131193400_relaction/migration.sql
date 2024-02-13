/*
  Warnings:

  - You are about to drop the column `shoppingId` on the `Product` table. All the data in the column will be lost.
  - Made the column `quantity` on table `ShoppingCart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalPrice` on table `ShoppingCart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shoppingId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "shoppingId";

-- AlterTable
ALTER TABLE "ShoppingCart" ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "totalPrice" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "ShoppingCart"("idShoppingCart") ON DELETE RESTRICT ON UPDATE CASCADE;

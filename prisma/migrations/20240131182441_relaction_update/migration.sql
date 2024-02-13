-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shoppingId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "shoppingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shoppingId_fkey" FOREIGN KEY ("shoppingId") REFERENCES "ShoppingCart"("idShoppingCart") ON DELETE SET NULL ON UPDATE CASCADE;

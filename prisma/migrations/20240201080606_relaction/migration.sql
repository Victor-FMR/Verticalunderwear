-- AlterTable
ALTER TABLE "ShoppingCart" ADD COLUMN     "quantity" INTEGER DEFAULT 1,
ADD COLUMN     "totalPrice" DECIMAL(10,2);

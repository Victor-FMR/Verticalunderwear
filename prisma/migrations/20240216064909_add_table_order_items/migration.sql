/*
  Warnings:

  - You are about to drop the column `addressIdAddress` on the `Order` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressIdAddress_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "addressIdAddress",
ADD COLUMN     "addressId" UUID NOT NULL,
ALTER COLUMN "completedAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OrderItem" (
    "idOrderItem" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("idOrderItem")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_idOrderItem_key" ON "OrderItem"("idOrderItem");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("idAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

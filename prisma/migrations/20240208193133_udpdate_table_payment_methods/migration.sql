/*
  Warnings:

  - A unique constraint covering the columns `[numeroTarjeta]` on the table `paymentMethods` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "paymentMethods_numeroTarjeta_key" ON "paymentMethods"("numeroTarjeta");

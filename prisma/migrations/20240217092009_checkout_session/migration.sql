/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `CheckoutSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CheckoutSession_id_key" ON "CheckoutSession"("id");

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "maxAddresses" INTEGER;

-- CreateTable
CREATE TABLE "paymentMethods" (
    "id_paymentMethod" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "numeroTarjeta" TEXT NOT NULL,
    "nombreTitular" TEXT NOT NULL,
    "monthVencimiento" INTEGER NOT NULL,
    "yearVencimiento" INTEGER NOT NULL,
    "codigoSeguridad" INTEGER NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paymentMethods_pkey" PRIMARY KEY ("id_paymentMethod")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentMethods_id_paymentMethod_key" ON "paymentMethods"("id_paymentMethod");

-- AddForeignKey
ALTER TABLE "paymentMethods" ADD CONSTRAINT "paymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

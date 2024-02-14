-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMINISTRADOR', 'MIEMBRO', 'CLIENTE');

-- CreateTable
CREATE TABLE "ShoppingCart" (
    "idShoppingCart" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingCart_pkey" PRIMARY KEY ("idShoppingCart")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "idCartItem" TEXT NOT NULL,
    "shoppingCartId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "priceAtAdd" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("idCartItem")
);

-- CreateTable
CREATE TABLE "Product" (
    "idProduct" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER,
    "price" DECIMAL(9,2) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("idProduct")
);

-- CreateTable
CREATE TABLE "Ratings" (
    "idRating" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ratings_pkey" PRIMARY KEY ("idRating")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "age" INTEGER,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roles" "Roles"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentMethods" (
    "id_paymentMethod" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "numeroTarjeta" TEXT NOT NULL,
    "nombreTitular" TEXT NOT NULL,
    "monthVencimiento" TEXT NOT NULL,
    "yearVencimiento" TEXT NOT NULL,
    "codigoSeguridad" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paymentMethods_pkey" PRIMARY KEY ("id_paymentMethod")
);

-- CreateTable
CREATE TABLE "Address" (
    "idAddress" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maxAddresses" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("idAddress")
);

-- CreateTable
CREATE TABLE "Order" (
    "idOrder" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "addressIdAddress" UUID NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("idOrder")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_userId_key" ON "ShoppingCart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_idRating_key" ON "Ratings"("idRating");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "paymentMethods_id_paymentMethod_key" ON "paymentMethods"("id_paymentMethod");

-- CreateIndex
CREATE UNIQUE INDEX "paymentMethods_numeroTarjeta_key" ON "paymentMethods"("numeroTarjeta");

-- CreateIndex
CREATE UNIQUE INDEX "Address_idAddress_key" ON "Address"("idAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Order_idOrder_key" ON "Order"("idOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "ShoppingCart"("idShoppingCart") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentMethods" ADD CONSTRAINT "paymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressIdAddress_fkey" FOREIGN KEY ("addressIdAddress") REFERENCES "Address"("idAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

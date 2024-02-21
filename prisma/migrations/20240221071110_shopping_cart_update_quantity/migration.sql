-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ShoppingCart" ALTER COLUMN "quantity" DROP DEFAULT;

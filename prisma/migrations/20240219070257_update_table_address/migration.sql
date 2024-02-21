/*
  Warnings:

  - You are about to drop the column `maxAddresses` on the `Address` table. All the data in the column will be lost.
  - Added the required column `address_line_1` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "maxAddresses",
ADD COLUMN     "address_line_1" TEXT NOT NULL default '' ,
ADD COLUMN     "address_line_2" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL default '' ,
ADD COLUMN     "last_name" TEXT NOT NULL default '', 
ADD COLUMN     "phone" TEXT NOT NULL  default '',
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "zipcode" SET DATA TYPE TEXT;

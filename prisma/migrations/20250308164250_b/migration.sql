/*
  Warnings:

  - You are about to drop the column `deliveryAddressId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_deliveryAddressId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "deliveryAddressId",
ADD COLUMN     "delivery_address_id" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_address_id_fkey" FOREIGN KEY ("delivery_address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

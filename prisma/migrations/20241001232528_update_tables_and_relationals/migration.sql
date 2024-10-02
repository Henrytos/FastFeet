/*
  Warnings:

  - You are about to drop the column `recipientId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryManId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderStatus` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `recipientId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `recipient_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `recipients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_deliveryManId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_recipientId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "recipientId";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "deliveryManId",
DROP COLUMN "orderStatus",
DROP COLUMN "recipientId",
ADD COLUMN     "delivery_at" TIMESTAMP(3),
ADD COLUMN     "delivery_man_id" TEXT,
ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "recipient_id" TEXT NOT NULL,
ADD COLUMN     "withdrawn_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "recipients" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_man_id_fkey" FOREIGN KEY ("delivery_man_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

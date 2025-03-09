/*
  Warnings:

  - You are about to drop the column `photoId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `photos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_photoId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "photoId",
ADD COLUMN     "photo_id" TEXT;

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "order_id";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

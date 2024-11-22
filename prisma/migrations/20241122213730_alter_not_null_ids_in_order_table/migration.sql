-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_addressId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_recipient_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "recipient_id" DROP NOT NULL,
ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

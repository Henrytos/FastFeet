-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_recipientId_fkey";

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

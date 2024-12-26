/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `recipients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipients_email_key" ON "recipients"("email");

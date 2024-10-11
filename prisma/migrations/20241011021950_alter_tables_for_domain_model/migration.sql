/*
  Warnings:

  - You are about to drop the column `created_at` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `logitude` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "recipientId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" DATETIME,
    CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL
);
INSERT INTO "new_addresses" ("city", "id", "latitude", "neighborhood", "number", "state", "street", "zip") SELECT "city", "id", "latitude", "neighborhood", "number", "state", "street", "zip" FROM "addresses";
DROP TABLE "addresses";
ALTER TABLE "new_addresses" RENAME TO "addresses";
CREATE TABLE "new_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_status" TEXT NOT NULL DEFAULT 'pending',
    "delivery_man_id" TEXT,
    "recipient_id" TEXT NOT NULL,
    "photoId" TEXT,
    "addressId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_at" DATETIME,
    "withdrawn_at" DATETIME,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "orders_delivery_man_id_fkey" FOREIGN KEY ("delivery_man_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "orders_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("created_at", "delivery_at", "delivery_man_id", "id", "order_status", "recipient_id", "updated_at", "withdrawn_at") SELECT "created_at", "delivery_at", "delivery_man_id", "id", "order_status", "recipient_id", "updated_at", "withdrawn_at" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE TABLE "new_photos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_photos" ("created_at", "filename", "id", "order_id", "updated_at", "url") SELECT "created_at", "filename", "id", "order_id", "updated_at", "url" FROM "photos";
DROP TABLE "photos";
ALTER TABLE "new_photos" RENAME TO "photos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

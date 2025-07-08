/*
  Warnings:

  - You are about to drop the `Walk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WalkCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Walk" DROP CONSTRAINT "Walk_collectionId_fkey";

-- DropTable
DROP TABLE "Walk";

-- DropTable
DROP TABLE "WalkCollection";

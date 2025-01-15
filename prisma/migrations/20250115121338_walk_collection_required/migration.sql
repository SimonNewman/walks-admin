/*
  Warnings:

  - Made the column `collectionId` on table `Walk` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Walk" DROP CONSTRAINT "Walk_collectionId_fkey";

-- AlterTable
ALTER TABLE "Walk" ALTER COLUMN "collectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Walk" ADD CONSTRAINT "Walk_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "WalkCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

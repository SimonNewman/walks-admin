/*
  Warnings:

  - You are about to drop the column `type` on the `WalkCollection` table. All the data in the column will be lost.
  - Made the column `slug` on table `WalkCollection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WalkCollection" DROP COLUMN "type",
ALTER COLUMN "slug" SET NOT NULL;

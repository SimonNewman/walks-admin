/*
  Warnings:

  - Made the column `url` on table `Walk` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `WalkCollection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Walk" ALTER COLUMN "url" SET NOT NULL;

-- AlterTable
ALTER TABLE "WalkCollection" ALTER COLUMN "url" SET NOT NULL;

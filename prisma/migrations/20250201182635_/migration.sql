/*
  Warnings:

  - A unique constraint covering the columns `[collectionId,slug]` on the table `Walk` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "walks_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "walks_collection_slug_unique" ON "Walk"("collectionId", "slug");

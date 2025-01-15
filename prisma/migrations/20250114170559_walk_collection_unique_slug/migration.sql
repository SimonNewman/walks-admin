/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `WalkCollection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WalkCollection_slug_key" ON "WalkCollection"("slug");

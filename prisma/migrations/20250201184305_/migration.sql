-- DropForeignKey
ALTER TABLE "Walk" DROP CONSTRAINT "Walk_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "Walk" ADD CONSTRAINT "Walk_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "WalkCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

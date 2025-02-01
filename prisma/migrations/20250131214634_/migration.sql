-- AlterTable
ALTER TABLE "Walk" ADD COLUMN     "gpx" TEXT,
ADD COLUMN     "osMap" TEXT,
ADD COLUMN     "parking" TEXT,
ADD COLUMN     "stiles" INTEGER,
ADD COLUMN     "time" INTEGER,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "WalkCollection" ADD COLUMN     "url" TEXT;

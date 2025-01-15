-- CreateTable
CREATE TABLE "WalkCollection" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,

    CONSTRAINT "WalkCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Walk" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "collectionId" BIGINT,
    "name" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "order" SMALLINT,
    "circular" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Walk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WalkCollection_name_key" ON "WalkCollection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "walks_slug_key" ON "Walk"("slug");

-- AddForeignKey
ALTER TABLE "Walk" ADD CONSTRAINT "Walk_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "WalkCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'GENERAL_ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GENERAL_ADMIN',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "headlineImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "viewCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "User" DROP COLUMN "updatedAt";

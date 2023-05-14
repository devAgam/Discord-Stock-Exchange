/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_portfolioId_fkey";

-- AlterTable
ALTER TABLE "portfolio" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "portfolioId";

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

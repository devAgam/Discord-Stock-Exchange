/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_portfolioId_fkey";

-- AlterTable
ALTER TABLE "portfolio" ADD COLUMN     "holdings" JSONB[];

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "portfolioId";

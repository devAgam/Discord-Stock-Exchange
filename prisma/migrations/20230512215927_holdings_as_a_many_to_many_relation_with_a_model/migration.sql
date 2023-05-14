/*
  Warnings:

  - You are about to drop the column `holdings` on the `portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "portfolio" DROP COLUMN "holdings";

-- CreateTable
CREATE TABLE "holdings" (
    "id" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "portfolioId" INTEGER,

    CONSTRAINT "holdings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

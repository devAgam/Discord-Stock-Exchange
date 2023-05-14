/*
  Warnings:

  - You are about to drop the `holdings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "holdings" DROP CONSTRAINT "holdings_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "holdings" DROP CONSTRAINT "holdings_stockId_fkey";

-- DropTable
DROP TABLE "holdings";

-- CreateTable
CREATE TABLE "holding" (
    "id" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "portfolioId" INTEGER,

    CONSTRAINT "holding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "holding_stockId_key" ON "holding"("stockId");

-- AddForeignKey
ALTER TABLE "holding" ADD CONSTRAINT "holding_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holding" ADD CONSTRAINT "holding_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

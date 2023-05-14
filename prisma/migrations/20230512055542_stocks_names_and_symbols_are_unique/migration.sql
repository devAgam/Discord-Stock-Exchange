/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tickerSymbol]` on the table `stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stock_name_key" ON "stock"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stock_tickerSymbol_key" ON "stock"("tickerSymbol");

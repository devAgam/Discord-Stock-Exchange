-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "portfolioId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tickerSymbol" TEXT NOT NULL,
    "portfolioId" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_discordId_key" ON "user"("discordId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_portfolioId_fkey";

-- AlterTable
ALTER TABLE "stock" ALTER COLUMN "portfolioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

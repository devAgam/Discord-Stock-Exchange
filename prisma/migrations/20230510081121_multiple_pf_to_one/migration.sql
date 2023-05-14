-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_portfolioId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "portfolioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

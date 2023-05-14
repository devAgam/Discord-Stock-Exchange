-- CreateTable
CREATE TABLE "guilds" (
    "id" SERIAL NOT NULL,
    "guild" TEXT NOT NULL,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_guild_key" ON "guilds"("guild");

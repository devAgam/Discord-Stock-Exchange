import { SlashCommandBuilder } from "@discordjs/builders";
import { resetPortfolioByDiscordId } from "../../functions/portfolio.functions";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blow-account")
    .setDescription("Blow your account 💣, sells all stocks"),
  async execute(interaction: any) {
    const nonce = await resetPortfolioByDiscordId(interaction.user.id);
    await interaction.reply(nonce.message);
  },
};

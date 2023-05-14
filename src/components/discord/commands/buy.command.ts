import { SlashCommandBuilder } from "@discordjs/builders";
import { addStockToPortfolioByDiscordId } from "../../functions/portfolio.functions";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy a stock 💵")
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("The stock symbol")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("quantity")
        .setDescription("The quantity of the stock")
        .setRequired(true)
        .setMinValue(1)
    ),

  async execute(interaction: any) {
    const nonce = await addStockToPortfolioByDiscordId(
      interaction.user.id,
      interaction.options.getString("symbol").toUpperCase(),
      interaction.options.getInteger("quantity")
    );

    await interaction.reply(nonce.message);
  },
};

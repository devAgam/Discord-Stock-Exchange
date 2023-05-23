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
    )
    .addIntegerOption((option) =>
      option
        .setName("price")
        .setDescription("The price of the stock")
        .setRequired(true)
    ),

  async execute(interaction: any) {
    const nonce = await addStockToPortfolioByDiscordId(
      interaction.user.id,
      interaction.options.getString("symbol").toUpperCase(),
      interaction.options.getInteger("quantity"),
      interaction.options.getInteger("price")
    );

    await interaction.reply(nonce.message);
  },
};

import { SlashCommandBuilder } from "@discordjs/builders";
import { sellStockByDiscordId } from "../../functions/portfolio.functions";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sell")
    .setDescription("Sell a stock 💵")
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
    const nonce = await sellStockByDiscordId(
      interaction.user.id,
      interaction.options.getString("symbol"),
      interaction.options.getInteger("quantity")
    );
    await interaction.reply(nonce.message);
  },
};

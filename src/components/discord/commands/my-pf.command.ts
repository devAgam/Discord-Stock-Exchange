import { SlashCommandBuilder } from "@discordjs/builders";
import { getPortfolioByDiscordId } from "../../functions/portfolio.functions";
// @ts-ignore
import AsciiTable from "ascii-table";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("my-pf")
    .setDescription("View your portfolio 📈"),
  async execute(interaction: any) {
    const nonce = await getPortfolioByDiscordId(interaction.user.id);
    if (!nonce.success) return await interaction.reply(nonce.message);
    const table = createPfTable(
      nonce.data?.portfolio?.holdings,
      interaction.user.username
    );
    console.log(table);
    // return table and mention the user
    await interaction.reply({
      content: table,
    });
  },
};

function createPfTable(pf: any, username?: string) {
  let pfTable = new AsciiTable(
    "My Portfolio" + (username ? " - " + username : "")
  );
  pfTable.setHeading("Symbol", "Quantity", "Avg", "LTP", "P/L", "Chg. %");
  if (!pf) return "No holdings found";
  pf.forEach((stock: any) => {
    pfTable.addRow(
      stock.stock.name,
      stock.quantity,
      stock.avgPrice,
      stock.stock.latestPrice,
      stock.gain,
      stock.gainPercentage
    );
  });
  return "```" + pfTable.toString() + "```";
}

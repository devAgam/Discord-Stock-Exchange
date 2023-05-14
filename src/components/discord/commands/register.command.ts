import { SlashCommandBuilder } from "@discordjs/builders";
import { createUser } from "../../functions/user.functions";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Open your account with us!"),
  async execute(interaction: any) {
    console.log("register command");
    const discordId = interaction.user.id;
    const newUserNonce = await createUser(discordId);
    if (newUserNonce.httpStatus == 200) {
      await interaction.reply({
        content: "Your account has been created! 🎉",
        ephemeral: true,
      });
    }
    if (newUserNonce.httpStatus == 201) {
      await interaction.reply({
        content: "Your account already exists 😅",
        ephemeral: true,
      });
    }
  },
};

import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
} from "discord.js";
import fs from "fs";
import path from "path";
import { getGuilds, storeGuild } from "../functions/discord.server.functions";

const token = process.env.DISCORD_BOT_TOKEN as string;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as any;

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c: any) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

client.on("guildCreate", async (guild: any) => {
  const { id } = guild;
  const nonce = await storeGuild(id);
  console.log(nonce);
  return;
});

client.commands = new Collection();

const commands = [] as any;

// Read all files in the commands directory
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
// regex for files that end with ts or js
// .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
// Register all commands
for (const file of commandFiles) {
  // file path should be redudant
  const filePath = path.join(__dirname, "commands", file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
  console.log(`Registered command: ${command.data.name}`);
}
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const guilds = await getGuilds();
    for (const guild of guilds) {
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = (await rest.put(
        Routes.applicationGuildCommands(
          process.env.DISCORD_CLIENT_ID as string,
          guild.guild as string
        ),
        { body: commands }
      )) as any;
      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    }
  } catch (error) {
    console.error(error);
  }
})();

client.on(Events.InteractionCreate, async (interaction: any) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

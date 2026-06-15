// ============================================================
// HAZE Manager — Slash Command Deployer
// Run this once: node deploy-commands.js
// ============================================================

require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const categoryFolders = fs.readdirSync(commandsPath);

for (const folder of categoryFolders) {
  const folderPath = path.join(commandsPath, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(folderPath, file));
    if (command?.data?.toJSON) {
      commands.push(command.data.toJSON());
      console.log(`[DEPLOY] Loaded: /${command.data.name}`);
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`\n[DEPLOY] Deploying ${commands.length} slash commands to guild...`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log(`[DEPLOY] ✅ Successfully deployed ${data.length} commands.`);
    console.log('[DEPLOY] Commands are now available in your server!');
  } catch (err) {
    console.error('[DEPLOY] ❌ Failed to deploy commands:', err);
  }
})();

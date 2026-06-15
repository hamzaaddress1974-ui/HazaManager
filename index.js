// ============================================================
// HAZE Manager — Main Entry Point
// ============================================================

require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const http = require('http');
const config = require('./config');
const { loadCommands } = require('./handlers/commandHandler');
const { loadEvents } = require('./handlers/eventHandler');

// ── Create Discord Client ──────────────────────────────────
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember],
});

// Attach command and cooldown collections to client
client.commands = new Collection();
client.cooldowns = new Collection();

// ── Load Handlers ──────────────────────────────────────────
loadCommands(client);
loadEvents(client);

// ── Login ──────────────────────────────────────────────────
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('[ERROR] DISCORD_TOKEN is not set. Add it to your environment secrets.');
  process.exit(1);
}

client.login(token).catch(err => {
  console.error('[ERROR] Failed to login:', err.message);
  process.exit(1);
});

// ── Keep-Alive HTTP Server (for Replit 24/7 hosting) ──────
// Replit pings this endpoint to keep the bot running.
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`${config.botName} is online and managing ${config.clanName}!`);
});

server.listen(PORT, () => {
  console.log(`[KEEP-ALIVE] HTTP server running on port ${PORT}`);
});

// ── Unhandled Errors ───────────────────────────────────────
process.on('unhandledRejection', (reason, promise) => {
  console.error('[ERROR] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', err => {
  console.error('[ERROR] Uncaught Exception:', err);
});

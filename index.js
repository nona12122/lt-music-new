require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player } = require("discord-player");
const { DefaultExtractors } = require("@discord-player/extractor");

const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.commands = new Collection();

const player = new Player(client);
client.player = player;
player.events.on("debug", (queue, message) => {
    console.log("[DEBUG]", message);
});

player.events.on("error", (queue, error) => {
    console.error("[PLAYER ERROR]", error);
});

player.events.on("playerError", (queue, error) => {
    console.error("[TRACK ERROR]", error);
});
(async () => {
    await player.extractors.loadMulti(DefaultExtractors);
})();

commandHandler(client);
eventHandler(client);

client.login(process.env.TOKEN);
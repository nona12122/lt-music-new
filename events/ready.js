const { Events } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        console.log(`✅ Logged in as ${client.user.tag}`);

        const guild = client.guilds.cache.first();
        if (!guild) return;

        const channel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);
        if (!channel) {
            console.log("❌ Voice channel not found.");
            return;
        }

        try {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false,
            });

            console.log("🎵 Joined voice channel!");
        } catch (err) {
            console.error(err);
        }
    },
};
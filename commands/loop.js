const { SlashCommandBuilder } = require("discord.js");
const { useQueue, QueueRepeatMode } = require("discord-player");
console.log("LOOP FILE LOADED");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("تغيير وضع الإعادة")
        .addStringOption(option =>
            option
                .setName("mode")
                .setDescription("نوع الإعادة")
                .setRequired(true)
                .addChoices(
                    { name: "❌ إيقاف", value: "off" },
                    { name: "🔂 إعادة الأغنية", value: "track" },
                    { name: "🔁 إعادة الطابور", value: "queue" }
                )
        ),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: "❌ لا توجد أغنية تعمل حاليًا.",
                ephemeral: true,
            });
        }

        const mode = interaction.options.getString("mode");

        let repeatMode = QueueRepeatMode.OFF;

        if (mode === "track") repeatMode = QueueRepeatMode.TRACK;
        if (mode === "queue") repeatMode = QueueRepeatMode.QUEUE;

        queue.setRepeatMode(repeatMode);

        const messages = {
            off: "❌ تم إيقاف الإعادة.",
            track: "🔂 سيتم إعادة نفس الأغنية.",
            queue: "🔁 سيتم إعادة قائمة التشغيل."
        };

        return interaction.reply(messages[mode]);
    }
};
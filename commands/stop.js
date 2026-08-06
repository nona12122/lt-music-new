const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("إيقاف الأغنية الحالية"),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: "❌ لا توجد أغنية تعمل حاليًا.",
                ephemeral: true,
            });
        }

        queue.node.stop();

        return interaction.reply("⏹️ تم إيقاف الأغنية.");
    },
};
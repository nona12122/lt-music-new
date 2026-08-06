const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("إيقاف الأغنية مؤقتًا"),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: "❌ لا توجد أغنية تعمل حاليًا.",
                ephemeral: true,
            });
        }

        if (queue.node.isPaused()) {
            return interaction.reply({
                content: "⏸️ الأغنية متوقفة بالفعل.",
                ephemeral: true,
            });
        }

        queue.node.setPaused(true);

        return interaction.reply("⏸️ تم إيقاف الأغنية مؤقتًا.");
    },
};
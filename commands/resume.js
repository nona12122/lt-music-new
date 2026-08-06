const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("إكمال تشغيل الأغنية"),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue) {
            return interaction.reply({
                content: "❌ لا توجد قائمة تشغيل.",
                ephemeral: true,
            });
        }

        if (!queue.node.isPaused()) {
            return interaction.reply({
                content: "▶️ الأغنية تعمل بالفعل.",
                ephemeral: true,
            });
        }

        queue.node.setPaused(false);

        return interaction.reply("▶️ تم استكمال تشغيل الأغنية.");
    },
};
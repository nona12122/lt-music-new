const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("تخطي الأغنية الحالية"),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: "❌ لا توجد أغنية تعمل حالياً.",
                ephemeral: true,
            });
        }

        try {
            await queue.node.skip();

            return interaction.reply("⏭️ تم تخطي الأغنية.");
        } catch (err) {
            console.error(err);

            return interaction.reply({
                content: "❌ تعذر تخطي الأغنية.",
                ephemeral: true,
            });
        }
    },
};
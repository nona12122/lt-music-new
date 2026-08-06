const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("عرض قائمة التشغيل"),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: "❌ لا توجد أغاني في قائمة التشغيل.",
                ephemeral: true,
            });
        }

        const tracks = queue.tracks.toArray();

        const description = tracks.length
            ? tracks
                  .map((track, index) =>
                      `${index + 1}. **${track.title}** - \`${track.duration}\``
                  )
                  .join("\n")
            : "لا توجد أغاني أخرى في الطابور.";

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("🎶 قائمة التشغيل")
            .addFields(
                {
                    name: "🎵 الأغنية الحالية",
                    value: `**${queue.currentTrack.title}** - \`${queue.currentTrack.duration}\``,
                },
                {
                    name: "📜 الأغاني القادمة",
                    value: description,
                }
            )
            .setFooter({
                text: `عدد الأغاني: ${tracks.length + 1}`,
            });

        return interaction.reply({
            embeds: [embed],
        });
    },
};
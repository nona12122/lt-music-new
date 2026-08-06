const {
    SlashCommandBuilder,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { useMainPlayer } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("تشغيل أغنية")
        .addStringOption(option =>
            option
                .setName("song")
                .setDescription("اسم الأغنية أو رابطها")
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const query = interaction.options.getString("song", true);
        const player = useMainPlayer();

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.editReply("❌ ادخل روم صوتي أولاً.");
        }

        if (
            !voiceChannel
                .permissionsFor(interaction.guild.members.me)
                .has(PermissionsBitField.Flags.Connect)
        ) {
            return interaction.editReply("❌ ما عندي صلاحية الدخول للروم.");
        }

        if (
            !voiceChannel
                .permissionsFor(interaction.guild.members.me)
                .has(PermissionsBitField.Flags.Speak)
        ) {
            return interaction.editReply("❌ ما عندي صلاحية التحدث.");
        }

        try {
     console.log("🚀 Starting play...");

const result = await player.play(voiceChannel, query, {
    metadata: interaction.channel,
    nodeOptions: {
        leaveOnEnd: false,
        leaveOnStop: false,
    },
});

console.log("✅ Play finished");

            return interaction.editReply(
                `🎵 تم إضافة **${result.track.title}** للطابور.`
            );
        } catch (err) {
            console.error(err);
            return interaction.editReply("❌ فشل تشغيل الأغنية.");
        }
    },
};
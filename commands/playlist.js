const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Playlist Spotify de estudos."),

    async execute(interaction) {
        await interaction.reply("https://open.spotify.com/playlist/1I75Ps2CLf4MxIpAcEXIZZ?si=9c9f660fbaf04ac7")
    }

}
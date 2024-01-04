const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    name:"ping",
    description: "Devuelve el tiempo de latencia",
    type: "command",
    enabled: true,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Devuelve el tiempo de latencia"),
    execute: function(interaction, client, commands) {
        interaction.reply(`🏓 Pong! ${interaction.createdTimestamp - Date.now()}ms`)
    }
}
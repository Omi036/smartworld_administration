const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    name:"echo",
    description: "Devuelve lo que dices",
    type: "command",
    enabled: true,
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Devuelve lo que dices"),
    execute: function(client) {
        console.log("Done")
    }
}
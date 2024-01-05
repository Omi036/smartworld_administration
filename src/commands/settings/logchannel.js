const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { invalidPermsEmbed } = require('../../core');

module.exports = {
    name:"logchannel",
    description: "Configura el canal de registros",
    type: "command",
    enabled: true,
    data: new SlashCommandBuilder()
        .setName("logchannel")
        .setDescription("Configura el canal de registros")
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("nuevo canal de registros")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)),

    execute: async function(interaction, client, commands, dbservice) {

        const channel = interaction.options.getChannel("channel");

        if(interaction.member.permissions.has("Administrator")) {
            await dbservice.colls.settings.findOneAndUpdate({header: "logchannel"},{ $set: { "value":channel.id }})
            await interaction.reply({content:`<#${channel.id}> es el nuevo canal de registros`})
        } else {
            await interaction.reply({embeds:[invalidPermsEmbed("Administrador")]})
        }
    }
}
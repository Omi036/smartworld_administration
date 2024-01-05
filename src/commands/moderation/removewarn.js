const { SlashCommandBuilder } = require('discord.js')
const { invalidPermsEmbed } = require('../../core')

module.exports = {
    name:"quitaradvertencia",
    description: "Revoca una advertencia de x usuario",
    type: "command",
    enabled: true,
    data: new SlashCommandBuilder()
        .setName("quitaradvertencia")
        .setDescription("Revoca una advertencia de x usuario")
        .addUserOption(option => 
            option.setName("usuario")
                .setDescription("Revoca una advertencia de x usuario")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("advertencia")
                .setDescription("Advertencia que revocar")
                .setRequired(true)),

    execute: async function(interaction, client, commands, dbservice) {

        const user = interaction.options.getUser("usuario");
        const warnings = interaction.options.getString("advertencia");

        if(interaction.member.permissions.has("Administrator")) {
            const query = {header: "warnings",target:user.id}

            const warningsDoc = await dbservice.colls.warnings.findOne(query)
            if(!warningsDoc) {
                interaction.reply({content:"El usuario no tiene ninguna advertencia", ephemeral:true})
                return
            }

            const warns = warningsDoc.value

            const right_one = warns.filter(el => el.date == warnings)

            if(right_one.length == 0) {
                await interaction.reply({content:"No se ha encontrado una advertencia con ese id", ephemeral:true})
                return
            }

            const value = warns.indexOf(right_one[0])

            warns.splice(value, 1)

            dbservice.colls.warnings.findOneAndReplace(query, {header: "warnings",target:user.id, value:warns})

            await interaction.reply({content:`Advertencia \`${warnings}\` borrada con éxito`})



        } else {
            await interaction.reply({embeds:[invalidPermsEmbed("Administrador")]})
        }
    }
}
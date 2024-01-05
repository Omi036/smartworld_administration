const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { formatDate } = require('../../core')
const { invalidPermsEmbed } = require('../../core')

module.exports = {
    name:"advertencias",
    description: "Añade una advertencia al usuario",
    type: "command",
    enabled: true,
    data: new SlashCommandBuilder()
        .setName("advertencias")
        .setDescription("Muestra advertencias del usuario")
        .addUserOption(option => 
            option.setName("user")
                .setDescription("Usuario al que buscar")
                .setRequired(true)),

    execute: async function(interaction, client, commands, dbservice) {


        if(interaction.member.permissions.has("Administrator")) {
            
            const target = interaction.options.getUser("user")

            const doc = await dbservice.colls.warnings.findOne({header: "warnings", target: target.id})

            if(!doc) {
                interaction.reply({content:`User <@${target.id}> no tiene ninguna advertencia`})
                return
            } 

            const embed = new EmbedBuilder()
                .setTitle(`Advertencias de ${target.displayName}`)
                .setDescription(`El usuario <@${target.id}> tiene las siguientes advertencias:`)
                .setColor(0xffaa00)
                .setThumbnail(target.avatarURL())


            doc.value.forEach(warn => {
                embed.addFields({
                    name: `${warn.date}`,
                    value:`**Emisor:** <@${warn.author}>\n**Receptor:** <@${warn.target}>\n**Sanción:** ${warn.gravedad} \n**Motivo:** ${warn.motivo}${warn.comentarios ? `\n**Comentarios:** ${warn.comentarios}` : ""}\n**Fecha:** ${formatDate(warn.date)}`
                })
            })

            interaction.reply({embeds: [embed]})
            

        } else {
            await interaction.reply({embeds:[invalidPermsEmbed("Administrador")]})
        }
    }
}
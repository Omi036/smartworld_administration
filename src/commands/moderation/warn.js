const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { invalidPermsEmbed } = require('../../core')

module.exports = {
    name:"advertir",
    description: "Añade una advertencia al usuario",
    type: "command",
    enabled: true,
    data: new SlashCommandBuilder()
        .setName("advertir")
        .setDescription("Añade una advertencia al usuario")
        .addUserOption(option => 
            option.setName("user")
                .setDescription("Usuario al que advertir")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("gravedad")
                .setDescription("Riesgo moderativo")
                .setChoices(
                    {name:"🔵 Azul", description:"Advertencia, (Expira tras 15 dias)", value:"🔵 Azul"},
                    {name:"🟢 Verde", description:"Sanción leve (Expira tras 30 días)", value:"🟢 Verde"},
                    {name:"🟠 Naranja", description:"Sanción grave (Expira tras 60 días)", value:"🟠 Naranja"},
                    {name:"🔴 Roja", description:"Expulsión", value:"🔴 Roja"},
                    {name:"🏴 Negra", description:"Expulsión permanente del staff y baneo o exilio de la comunidad.", value:"🏴 Negra"},
                )
                .setRequired(true))
        .addStringOption(option => 
            option.setName("motivo")
                .setDescription("Motivo de la advertencia")
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("comentarios")
                .setDescription("Comentarios sobre la advertencia")
                .setRequired(false)
        ),

    execute: async function(interaction, client, commands, dbservice) {

        if(interaction.member.permissions.has("Administrator")) {

            const riesgos = {
                "🔵 Azul": "Advertencia, (Expira tras 15 dias)",
                "🟢 Verde": "Sanción leve (Expira tras 30 días)", 
                "🟠 Naranja": "Sanción grave (Expira tras 60 días)",
                "🔴 Roja": "Expulsión",
                "🏴 Negra": "Expulsión permanente del staff y baneo o exilio",
            }

            const channel = (await dbservice.colls.settings.findOne({header:"logchannel"})).value
            
            const author = interaction.user
            const target = interaction.options.getUser("user")
            const gravedad = interaction.options.getString("gravedad")
            const motivo = interaction.options.getString("motivo")
            const comentarios = interaction.options.getString("comentarios") ?? ""
            const fecha = Date.now()


            if(author.id === target.id){
                interaction.reply({content:"❌ No puedes advertirte a ti mismo", ephemeral: true})
                return
            }

            const embed = new EmbedBuilder()
                .setTitle("Parte Administrativo")
                .setColor(0xff5555)
                .setDescription(`**Emisor:** <@${author.id}>\n**Receptor:** <@${target.id}>\n**Sanción:** ${gravedad} **-** ${riesgos[gravedad]} \n**Motivo:** ${motivo}${comentarios ? `\n**Comentarios:** ${comentarios}` : ""}`)
                .setTimestamp(fecha)

            const warning = {
                author: author.id,
                target: target.id,  
                gravedad: gravedad,
                motivo: motivo,
                comentarios: comentarios,
                date: fecha
            }

            await interaction.reply({content: `Parte enviado, revise <#${channel}>`, ephemeral: true})

            await dbservice.colls.warnings.findOne({header: "warnings", target:target.id }) ?? await dbservice.colls.warnings.insertOne({header: "warnings", target:target.id, targetName: target.displayName, value: []})

            await dbservice.colls.warnings.updateOne({header: "warnings", target:target.id }, {$push: { value: warning }})

            await (await interaction.guild.channels.fetch(channel)).send({embeds: [embed]})

        } else {
            await interaction.reply({embeds:[invalidPermsEmbed("Administrador")]})
        }
    }
}
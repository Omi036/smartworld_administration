const { EmbedBuilder } = require("discord.js")

const errorColor = 0xff5555
const successColor = 0x55ff55

exports.invalidPermsEmbed = (permission) => {
    const embed = new EmbedBuilder()
        .setTitle("Permisos Inválidos")
        .setDescription(`No puedes ejecutar este comando, necesitas permisos de \`${permission}\``)
        .setColor(errorColor)

    return embed
}

exports.selfTargetEmbed = () => {
    
    const embed = new EmbedBuilder()
        .setTitle("Objetivo inválido")
        .setDescription("No puedes ejecutar este comando sobre ti mismo")
        .setColor(errorColor)

    return embed
}

exports.successEmbed = (message) => {
    
    const embed = new EmbedBuilder()
        .setTitle("Operacion realizada exitosamente")
        .setDescription(message)
        .setColor(successColor)

    return embed
}
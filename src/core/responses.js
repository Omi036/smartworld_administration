const { EmbedBuilder } = require("discord.js")

exports.invalidPermsEmbed = (permission) => {
    const embed = new EmbedBuilder()
        .setTitle("Permisos Inválidos")
        .setDescription(`No puedes ejecutar este comando, necesitas permisos de \`${permission}\``)
        .setColor(0xff5555)

    return embed
}
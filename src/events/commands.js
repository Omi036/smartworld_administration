const { logError } = require("../core");

module.exports = {
    name:"command",
    description:"On new command",
    enabled: true,
    type: "event",
    execute: function(client, commands, dbservice) {
        client.on("interactionCreate", async interaction => {
            if (!interaction.isChatInputCommand()) return;

            const command = commands.get(interaction.commandName);

            if (!command) {
                logError(`No command matching ${interaction.commandName} was found.`)
                return;
            }

            try {
                await command.execute(interaction, client, commands, dbservice);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        })
    }
}
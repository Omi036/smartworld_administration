# Smartworld administration bot
Discord Administration Bot for SmartWorld Server

# Config
All the config must be placed inside a `.env` file:   
```dotenv
TOKEN=
CLIENT_ID=

DB_USER=
DB_PASSWORD=
DB_IP=
DB_PORT=
```
# Files
## Events
Events files must be placed under `src/events`, ending in `.js`.  
The module must have the following structure:
```js
module.exports = {
    name:"ready",  // Custom name
    description:"On client login",  // Custom description
    enabled: true,  // Wether the module is enabled or disabled
    type: "event",
    execute: function(client) {    // function containing the body
        client.on("ready", () => {
            console.log("Client is ready")
        })
    }
}
```

## Commands
Command files must be placed under `src/commands/CATEGORY`, ending in `.js
The module must have the following structure:
```js
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    name:"ping", // Command name (must match the name inside data)
    description: "Returns Pong", // Command description
    type: "commands",
    enabled: true,  // Wether the module is enabled or disabled
    data: new SlashCommandBuilder()   // see https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files
        .setName("echo")
        .setDescription("Devuelve lo que dices"),
    execute: function(client) {   // The actual command
        console.log("Done")
    }
}
```
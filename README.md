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
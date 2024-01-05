const { logInfo } = require("../core")

module.exports = {
    name:"ready",
    description:"On client login",
    enabled: true,
    type: "event",
    execute: function(client) {
        client.on("ready", () => {
            logInfo("Client is ready")
        })
    }
}
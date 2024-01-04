module.exports = {
    name:"ready",
    description:"On client login",
    enabled: true,
    type: "event",
    execute: function(client) {
        client.on("ready", () => {
            console.info("[INFO] Client is ready")
        })
    }
}
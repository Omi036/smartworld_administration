module.exports = {
    name:"echo",
    description: "Devuelve lo que dices",
    type: "commands",
    enabled: true,
    execute: function(client) {
        console.log("Done")
    }
}
require("dotenv").config()

const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { loadCommands } = require("./core/loadCommands")
const { loadEvents } = require("./core/loadEvents")

const client = new Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds] })
const token = process.env.TOKEN

const events = new Collection()
const commands = new Collection()

loadCommands(client, commands)
loadEvents(client, events, commands)


client.login(token)
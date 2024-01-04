require("dotenv").config()

const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { hasProperStructure } = require("./utils/hasStructure")
const fs = require("fs")
const path = require("path")

const client = new Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds] })
const token = process.env.TOKEN

const events = new Collection()
const commands = new Collection()

const events_path = path.join(__dirname,"events")
const commands_path = path.join(__dirname,"commands")


// Events Loader
const events_files = fs.readdirSync(events_path).filter(file => file.endsWith("js"));

for(const file of events_files){
    const relative_path = path.join(events_path, file)

    const event = require(relative_path)

    if(hasProperStructure(event)){
        if(event.enabled) {
            events.set(event.name, event)
            event.execute(client)
        } else {
            console.info(`[INFO] Event ${event} wasn't enabled`)
        }
    } else {
        console.error(`[ERR] \`${event}\` Doesn't have the proper structure, see https://github.com/Omi036/smartworld_administration#events for more details`)
    }
}




client.login(token)
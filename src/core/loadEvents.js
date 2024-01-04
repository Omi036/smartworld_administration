const { hasProperStructure } = require("./hasProperStructure")
const fs = require("fs")
const path = require("path")

exports.loadEvents = function(client, events, commands) {

    const events_path = path.join(__dirname,"../events")

    const events_files = fs.readdirSync(events_path).filter(file => file.endsWith(".js"));

    for(const file of events_files){
        const relative_path = path.join(events_path, file)

        const event = require(relative_path)

        if(hasProperStructure(event)){
            if(event.enabled) {
                events.set(event.name, event)
                event.execute(client, commands)
            } else {
                console.info(`[INFO] Event ${event.name} wasn't enabled`)
            }
        } else {
            console.error(`[ERR] Event \`${file}\` Doesn't have the proper structure, see https://github.com/Omi036/smartworld_administration#events for more details`)
        }
    }

}
const { hasProperStructure } = require("./hasProperStructure")
const fs = require("fs")
const path = require("path")
const { logInfo, logError } = require("./log")

exports.loadCommands = function(client, commands) {

    const commands_path = path.join(__dirname,"../commands")

    const commands_categories = fs.readdirSync(commands_path)  //? Ruta donde estan todas las categorias "Misc" "Moderacion"

    commands_categories.forEach(category => {    //? Entra dentro de cada categoria "Misc" "Moderacion"

        const category_path = path.join(commands_path,category)   //? Ruta de la categoria "commands/Misc" "commands/Moderacion"
        const modules = fs.readdirSync(category_path).filter(file => file.endsWith(".js"))   //? Obtiene todos los modulos js dentro de la subcategoria

        for(const module of modules) {

            const command_path = path.join(category_path,module)
            const command = require(command_path)
            if(hasProperStructure(command)) {
                if(command.enabled){
                    commands.set(command.name, command)
                } else {
                    logInfo(`Command ${command.name} wasn't enabled`)
                }
            } else {
                logError(`Command \`${module}\` Doesn't have the proper structure, see https://github.com/Omi036/smartworld_administration#events for more details`)
            }
        }
    })
}
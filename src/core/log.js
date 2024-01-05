const colors = require("colors/safe")

exports.logInfo = (message) => {
    console.info(colors.blue("[INFO] ") + message)
}

exports.logError = (message) => {
    console.error(colors.red("[ERR] ") + message)
}

exports.logWarn = (message) => {
    console.warn(colors.yellow("[WARN] ") + message)
}
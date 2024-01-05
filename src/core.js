const { DatabaseStart } = require("./core/database");
const { hasProperStructure } = require("./core/hasProperStructure");
const { loadCommands } = require("./core/loadCommands");
const { loadEvents } = require("./core/loadEvents");
const { invalidPermsEmbed, selfTargetEmbed, successEmbed } = require("./core/responses");
const { formatDate } = require("./core/time");

exports.DatabaseStart = DatabaseStart
exports.hasProperStructure = hasProperStructure
exports.loadCommands = loadCommands
exports.loadEvents = loadEvents
exports.invalidPermsEmbed = invalidPermsEmbed
exports.formatDate = formatDate
exports.selfTargetEmbed = selfTargetEmbed
exports.successEmbed = successEmbed
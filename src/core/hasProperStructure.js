exports.hasProperStructure = function(module) {

    var healthy

    switch (module.type) {
        case "event":
            healthy = ('name' in module &&
                'type' in module &&
                'description' in module &&
                'enabled' in module &&
                'execute' in module
            )
            break;
    
        case "command":
            healthy = ('name' in module &&
                'type' in module &&
                'description' in module &&
                'enabled' in module &&
                'data' in module &&
                'execute' in module
            )
            break;

        default:
            healthy = false
    }


    return healthy

}
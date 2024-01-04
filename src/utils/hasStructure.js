exports.hasProperStructure = function(module) {

    const structure_check = ('name' in module &&
        'type' in module &&
        'description' in module &&
        'enabled' in module &&
        'execute' in module
    )

    return structure_check

}
const createGroup = (user, companion) => {

    // in database check if user&companion or companion&user return that group else

    group = {
        name: `${user}&${companion}`
    }

    return group
}


module.exports = {createGroup}

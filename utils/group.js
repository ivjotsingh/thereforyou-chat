const createGroup = (user, companion) => {

    // in database check if user&companion or companion&user return that group else
    try{
        group = {
            groupName: `${user}&${companion}`
        }

        return group
    }
    catch{
        return {error: 'message'}
    }

}


module.exports = {createGroup}

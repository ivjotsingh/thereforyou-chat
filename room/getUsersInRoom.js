const Room = require("../room/room")

exports.getUsersInRoom = async (room)=>{
    try{
    let sessionUsers = await Room.find({_id : room._id});
    let sessionUsersId =[];
    for (let sessionuser in sessionUsers){
        sessionUsersId.push(sessionuser.user);
    }
    return {users:sessionUsersId};
    }
    catch(err){
        return {error:err};
    }
}

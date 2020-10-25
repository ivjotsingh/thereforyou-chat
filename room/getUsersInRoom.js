const Room = require("../room/room")

exports.getUsersInRoom = async (room)=>{
    try{
    let sessionUsers = await Room.find({_id =room._id});
    return {users:sessionUsers};
    }
    catch(err){
        return {error:err};
    }
}

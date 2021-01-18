const Room = require("./room");

/* Will create room only if room doesn't exists,
if room exists , just add user to room */
createRoom = async (user, topic) => {
  /* Currently we are creating room with the same name as topic */
  let room_data;
  let room = await Room.findOne({ roomName: topic });
  if (room) {
    //Check if we can add user to the room
    if (room.users.length() < 2) {
      room.users = [...room.users, user._id];

      room_data = room.save();
    } else {
      return { error: `User cannot be added to room ${topic}` };
    }
  } else {
    let room = new Room({
      roomName: topic,
      //users=[user._id]
    });

    room_data = await room.save();
  }
  return { room: room_data };
};

module.exports = createRoom;

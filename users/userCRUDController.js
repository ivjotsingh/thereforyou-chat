const users = [];
const createSessionUser = require("./createSessionUser");

const addUser = ({ id, name, userType, topic }) => {
  name.trim().toLowerCase();
  topic.trim().toLowerCase();
  userType.trim().toLowerCase();

  if (!name || !topic) return { error: "Username and topic are required." };

  if (userType == "listener" || userType == "member") {
    let { error, listenerId } = createSessionUser(name, userType, topic);

    if (!error) {
      const { error1, room } = createRoom(listenerId, topic);
      if (error1) return { error: error1 };
      else return { name, room };
    } else {
      return { error };
    }
  } else {
    return { error: "Invalid user type." };
  }
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

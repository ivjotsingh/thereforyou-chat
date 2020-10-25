const createSessionUser = require("./createSessionUser");

const addUser = ({ id, name, userType, topic }) => {
  name.trim().toLowerCase();
  topic.trim().toLowerCase();
  userType.trim().toLowerCase();

  if (!name || !topic) return { error: "Username and topic are required." };

  if (userType == "listener" || userType == "member") {
    let { error,name, user } = createSessionUser(name, userType, topic);

    if (!error) {
      const { error, room } = createRoom(user, topic);
      if (error) return { error: error };
      else return { user, room };
    } else {
      return { error };
    }
  } else {
    return { error: "Invalid user type." };
  }
};


const getUser = (id) => users.find((user) => user.id === id);

module.exports = { addUser, removeUser, getUser };

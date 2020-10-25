const createSessionUser = require("./createSessionUser");

exports.addUser = async ({ id, name, userType, topic }) => {
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

const createSessionUser = require("./createSessionUser");

addUser = async ({ id, name, userType, topic }) => {
  name.trim().toLowerCase();
  topic.trim().toLowerCase();
  userType.trim().toLowerCase();

  if (!name || !topic) return { error: "Username and topic are required." };

  if (userType === "listener" || userType === "member") {
    console.log("It is listener or member")
    let { error,name, user } = createSessionUser(name, userType, topic);

    if (!error) {
      const { error, room } = createRoom(user, topic);
      if (error) return { error: error };
      else return {user, room };
    } else {
      return { error };
    }
  } else {
    return { error: "Invalid user type." };
  }
};

module.exports= addUser;

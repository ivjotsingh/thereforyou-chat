const createSessionUser = require("./createSessionUser");
const createRoom = require("../room/createRoom");

addUser = async ({ id, name, userType, topic }) => {
  name.trim().toLowerCase();
  topic.trim().toLowerCase();
  userType.trim().toLowerCase();

  if (!name || !topic) return { error: "Username and topic are required." };

  if (userType === "listener" || userType === "member") {
    console.log("It is listener or member");
    try {
      console.log(name);
      let { error, userName, user } = await createSessionUser(
        name,
        userType,
        topic
      );

      if (!error) {
        let { error, room } = await createRoom(user, topic);
        if (error) return { error: error };
        else return { user, room };
      } else {
        return { error };
      }
    } catch (err) {
      console.log("Inside catch block of createSessionUser ");
      console.log(err);
      return { error: err };
    }
  } else {
    return { error: "Invalid user type." };
  }
};

module.exports = addUser;

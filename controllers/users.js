const users = [];
const createListener = require("./createListener");
const createMember = require("./createMember");

const addUser = ({ id, name, userType, topic }) => {
  name.trim().toLowerCase();
  topic.trim().toLowerCase();
  userType.trim().toLowerCase();
  // const existingUser = users.find(
  //   (user) => user.room === room && user.name === name
  // );

  if (!name || !topic) return { error: "Username and topic are required." };
  // if (existingUser) return { error: "Username is taken." };

  // const user = { id, name, room };
  if (userType == "listener") {
    return createListener(name, userType, topic);
  } else if (userType == "member") {
    return createMember(name, userType, topic);
  } else return { error: "Invalid user type." };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

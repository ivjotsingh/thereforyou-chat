const User = require("./user");
const Listener = require("./listener");
const Member = require("./member");

/*Will create Listener/Member if the user is not already a listener/member,
else just add a session to already created Listener/Member*/

/*Listener or Member to be collectively referred as SessionUser*/

createSessionUser = async (name, userType, topic) => {
  try {
    //SessionUser should be created independent of User, so that
    //this chat service does not have dependency on session service DB, CH#1
    console.log("creating session user");
    //CH#1 Start
    // let user = await User.findOne({
    //   userName: name,
    // });
    // console.log(user);
    // if (user) {
    //CH#1 End
    let userModel;
    if (userType === "listener") {
      userModel = Listener;
    } else {
      userModel = Member;
    }
    let sessionUser = await userModel.findOne({ userName: name });
    let sessionUserData;

    //If User already been a SessionUser before
    if (sessionUser) {
      try {
        let sessionCount = sessionUser.sessions.get(topic);
        let session = new Map();
        session.set(topic, sessionCount + 1);
      } catch (err) {
        let session = new Map(String, Number);
        session.set(topic, 1);
        sessionUser.sessions = session;
      }
    }
    //The User is being a first time listener/member
    else {
      let session = new Map();
      session.set(topic, 1);
      let sessionUser = new userModel({
        userName: name,
        isOnline: true,
        //adding session
        sessions: session,
      });
      console.log(sessionUser);
    }

    //CH#1 Start
    // else {
    //   return { error: "User does not exists" };
    // }
    //CH#1 End
    sessionUserData = await sessionUser.save();
    console.log("Sessionuser created!");
    return { userName: sessionUserData.userName, user: sessionUser };
  } catch (err) {
    console.log("Inside catch");
    console.log(err);
    return { error: err };
  }
};

module.exports = createSessionUser;

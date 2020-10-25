const User = require("./user");
const Listener = require("./listener");
const Member = require("./member")

/*Will create Listener/Member if the user is not already a listener/member,
else just add a session to already created Listener/Member*/

/*Listener or Member to be collectively referred as SessionUser*/

exports.createSessionUser= async (name, userType,topic) => {
  try {
    //dependency to create a SessionUser
    let user = User.findOne({
      userName: name,
    });

    if (user) {
      let userModel;
      if (userType=="listener")
      {
        userModel=Listener;
      }
      else{
        userModel=Member;
      }
      let sessionUser = userModel.findOne({ userId: user._id });
      let sessionUserData;

      //If User already been a SessionUser before
      if (sessionUser) {
        try {
          let sessionCount = user.sessions.get(topic);
          let session = Map(String, Number);
          session.set(topic, sessionCount + 1);

        } catch (err) {
          let session = Map(String, Number);
          session.set(topic, 1);
          sessionUser.sessions = session;
        }
        sessionUser.isOnline = true;
        sessionUserData = await sessionUser.save();
      }
      //The User is being a first time listener/member
      else {
        let session = new Map(String, Number);
        session.set(topic, 1);
        let sessionUser = new userModel({
          userId: user._id,
          isOnline: true,
          //adding session
          sessions: session,
        });

        sessionUser.isOnline=True;
        sessionUserData = await sessionUser.save();
      }
      
    }
    else {
      return { error: "User does not exists" };
    }

    return { user: sessionUser };
  } 
  catch (err) {
    return { error: err };
  }
};

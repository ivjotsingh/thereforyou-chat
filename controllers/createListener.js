const User = require("../models/user");
const Listener = require("../models/listener");

/*Will create Listener if the user is not already a listener,
else just add a session to already created Listener*/

exports.CreateListener = async (name, topic) => {
  try {
    //dependency to create a Listener
    let user = User.findOne({
      userName: name,
    });

    if (user) {
      let listener = Listener.findOne({ userId: user._id });
      let listener_data;
      //if User already been a listener before
      if (listener) {
        try {
          let sessionCount = listener.sessions.get(topic);
          let session = Map(String, Number);
          session.set(topic, sessionCount + 1);
        } catch (err) {
          let session = Map(String, Number);
          session.set(topic, 1);
          listener.sessions = session;
        }

        listener_data = await listener.save();
      }
      //The User is being a first time listener
      else {
        let session = new Map(String, Number);
        session.set(topic, 1);
        let listener = new Listener({
          userId: user._id,
          isOnline: true,
          //adding session
          sessions: session,
        });

        listener_data = await listener.save();
      }
    } else {
      return { error: "User does not exists" };
    }

    return { listenerId: listener_data._id };
  } catch (err) {
    return { error: err };
  }
};

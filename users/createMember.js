const User = require("./user");
const Member = require("./member");

/*Will create Member if the user is not already a Member,
else just add a session to already created Member*/
exports.CreateMember = async (name, topic) => {
  try {
    //dependency to create a Listener
    let user = User.findOne({
      userName: name,
    });

    if (user) {
      let member = Member.findOne({ userId: user._id });
      let member_data;
      if (member) {
        try {
          let sessionCount = member.sessions.get(topic);
          let session = Map(String, Number);
          session.set(topic, sessionCount + 1);
        } catch (err) {
          let session = Map(String, Number);
          session.set(topic, 1);
          member.sessions = session;
        }

        member_data = await member.save();
      } else {
        let session = new Map(String, Number);
        session.set(topic, 1);
        let member = new Member({
          userId: user._id,
          isOnline: true,
          //adding session
          sessions: session,
        });
        member_data = await member.save();
      }
    } else {
      return { error: "User does not exists" };
    }
    return { memberId: member_data._id };
  } catch (err) {
    return { error: err };
  }
};

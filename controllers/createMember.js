const User = require("../models/user");
const Member = require("../models/member");

exports.CreateMember = (name, topic) => {
  try {
    //dependency to create a Listener
    let user = User.findOne({
      userName: name,
    });

    if (user) {
      let member = Member.findOne({ userId: user._id });
      if (member){
          try{
          let sessionCount=member.sessions.get(topic);
          let session=Map(String,Number);
          session.set(topic,sessionCount+1);
        }
        catch(err){
            let session=Map(String,Number);
            session.set(topic,1);
            member.sessions=session;
        }

          await member.save();
      }
      else{
        let session=new Map(String,Number);
        session.set(topic,1)
        let member = new Member({
        userId: user._id,
        isOnline: true,
        //adding session
        sessions: session});
        await member.save();
        };
    }
    else    { return {error:"User does not exists"}}
return {room:topic};
}
catch(err){
    return {error:err} ;
 
};
}
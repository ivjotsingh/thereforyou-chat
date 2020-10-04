const User = require("../models/user");
const Listener = require("../models/listener");

exports.CreateListener = (name, topic) => {
  try {
    //dependency to create a Listener
    let user = User.findOne({
      userName: name,
    });

    if (user) {
      let listener = Listener.findOne({ userId: user._id });

      //User already been a listener before
      if (listener){
          try{
          let sessionCount=listener.sessions.get(topic);
          let session=Map(String,Number);
          session.set(topic,sessionCount+1);
        }
        catch(err){
            let session=Map(String,Number);
            session.set(topic,1);
            listener.sessions=session;
        }

          await listener.save();
      }
      //The User is being a first time listener
      else{
        let session=new Map(String,Number);
        session.set(topic,1)
        let listener = new Listener({
        userId: user._id,
        isOnline: true,
        //adding session
        sessions: session});
        await listener.save();
        };
    }
    else    
    {
        return {error:"User does not exists"}
}

return { room:topic};
}
catch(err){
    return {
        error:err
        };
 
};
}


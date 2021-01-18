const Listener = require("./listener");
const Member = require("./member");
getUser = async (userId,userType) => {
    let sessionUserModel;
    if (userType == "listener"){
        sessionUserModel = Listener;
    }
    else{
        sessionUserModel = Member;
    }
    let sessionUser = await sessionUserModel.findOne({user:userId});
    return sessionUser;
};

module.exports=getUser;
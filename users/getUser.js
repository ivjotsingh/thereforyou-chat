const Listener = require("./users/listener");
const Member = require("./users/member");
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
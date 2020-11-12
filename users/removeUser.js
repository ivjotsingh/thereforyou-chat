const Listener = require("./listener");
const Member = require("./member");
const User = require("./user");

removeUser = async(userName,userType) => {
    try{
        let sessionUser;
        if (userType != "listener" || userType != "member"){
            return {error: {message:"Invalid user Type!"}};
        }
        else{
            if (userType == "listener"){
                sessionUser = Listener;
            }
            else{
                sessionUser = Member;
            }
            let userData = User.findOne({userName: userName});
            let sessionUserData = await sessionUser.findOne({_id: userData.user});
            sessionUserData.isOnline = false;
            let updatedSessionUser = await sessionUserData.save();
            return {name: userName}
        }

    }
    catch(err){
        return {error:err}
    }

};

module.exports=removeUser;
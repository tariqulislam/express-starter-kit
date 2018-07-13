var user = require('./../../models').User;
var invitetoken = require('./../../models').invitetoken;
var moment = require('moment');

let UserService = {
    userLogin: (req, cb) => {
        var reqUser = req.body;
        invitetoken.findOne({where: {token: reqUser.token, isActive: 1}}).then((result) => {
            if(result == null) {
                user.update({loginAttempt: reqUser.count},{where:{agentName: reqUser.agent}}).then((result) => console.log('updated'));
                user.findOne({where:{agentName: reqUser.agent}}).then((result) => {
                 if(result != null) {
                     let user = result.get({plain: true});
                     let mycount = user.loginAttempt
                     console.log('find one', mycount)
                     if(mycount >= 10) {
                         cb({
                             code: 401,
                             message: "To many Client Request"
                         });
                     } else {
                         cb({
                             code: 401,
                             message: "Unauthenticated Token or Token is Disabled"
                         });
                     }             
                 }
               });
            } else {
                  let token = result.get({plain: true});
                  let nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
                  let tokenExpireDate = moment(token.expireDate).format("YYYY-MM-DD HH:mm:ss");
     
                  if(nowDate > tokenExpireDate) {
                     user.update({loginAttempt: reqUser.count},{where:{agentName: reqUser.agent}}).then((result) => console.log('updated'));
                     cb({
                         code: 401,
                         message: "Token Already Expired"
                     });
                  } else {
                     cb({
                         code: 200,
                         message: "User Authenticated Successfully"
                     });
                  }
     
            }
        });
    }
}

module.exports = UserService;
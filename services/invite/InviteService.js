var moment = require('moment');
var randomString = require('randomstring');
var invitetoken = require('../../models').invitetoken;
require('dotenv').config();

const InviteService = {
    generate: (cb) => {
        const min = 6;
        const max = 12;
        let randomNum = Math.floor(Math.random() * ((max - min) +1) + min);
        let randomToken = randomString.generate({
            length: randomNum,
            charset: 'alphabetic',
        });
        let expiredDate = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
    
        let insertObject = {token: randomToken, expireDate: expiredDate, isActive: 1};
        
        invitetoken.create(insertObject)
        .then((result) => {
             if(result != null) {
                console.log('this is rsult', result)
                cb({
                    code: 200,
                    message: "Code Generate Succsfully",
                    generateCode: randomToken
                });
             } else {
                console.log('this is rsult', result)
                cb({
                    code: 500,
                    message: "Something went wrong when create the Token Number",
                    generateCode: null
                });
             }
         });
    },
    getAllInvitation: (cb) => {
        invitetoken.findAll().then(invs => {
                if(!invs) {
                    cb({
                        code: 404,
                        message: "Invitation  is empty",
                        invs: null
                    });
                } else {
                   let modifiedInv = [];
                    invs.forEach((elem) => {
                        let temp = {};
                        temp.id = elem.id;
                        temp.isActive= elem.isActive;
                        temp.token = elem.token;
                        temp.expireDate = moment(elem.expireDate).format("YYYY-MM-DD HH:mm:ss");
                        temp.createdAt = moment(elem.createdAt).format("YYYY-MM-DD HH:mm:ss");

                        modifiedInv.push(temp);
                    });
                    console.log(modifiedInv);
                    cb({
                        code: 200,
                        message: "Invitation retrive successfully",
                        invs: modifiedInv
                    });
                }
        });
    },
    activeInvitation: (inv, cb) => {
        if(!inv.id) {
            cb({
                code: 403,
                message: "Invitation id is empty"
            });
        } else {
            invitetoken.update({isActive: 1}, {where: {id:inv.id}}).then(res => {
                    if(!res) {
                        cb({
                            code: 403,
                            message: "something went wrong when updating invitation"
                        });
                    } else {
                        cb({
                            code: 200,
                            message: "Inviation active successfully"
                        });
                    }
            });
        }
      
    },
    inactiveInvitation: (inv, cb) => {

        if(!inv.id) {
            cb({
                code: 403,
                message: "Invitation id is empty"
            });
        } else {
            invitetoken.update({isActive: 0}, {where: {id: inv.id}}).then(res => {
                    if(!res) {
                        cb({
                            code: 403,
                            message: "something went wrong when updating invitation"
                        });
                    } else {
                        cb({
                            code: 200,
                            message: "Inviation inactive successfully"
                        });
                    }
            });
        }
    }
}

module.exports = InviteService
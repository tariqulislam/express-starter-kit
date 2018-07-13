var Admin = require('../../models').Admin;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
require('dotenv').config();

const AdminService = {
    register: (admin, cb) => {
        console.log(admin)
        if(!admin.firstName) {
            cb({
                code: 403,
                message: "Admin First Name is Empty",
            })
        } 
        else if(!admin.lastName) {
            cb({
                code: 403,
                message: "Admin last Name is Empty",
            })
        }
        else if(!admin.email) {
            cb({
                code: 403,
                message: "Admin email is Empty",
            })
        }
        else if(!admin.password) {
            cb({
                code: 403,
                message: "Admin password is Empty",
            })
        }
        else {
            Admin.findOne({where:{email: admin.email}}).then((newAdmin) => {
                console.log('this is new Admin',newAdmin);
                if(newAdmin == null) {
                 bcrypt.hash(admin.password, 10, (err, hash) => {
                     if (err) {
                       res.json({'output': err})
                     }
        
                     Admin.create({
                        firstName: admin.firstName,
                        lastName: admin.lastName,
                        email: admin.email,
                        password: hash
                      })
                    .then((result) => {
                             console.log('this is rsult', result)
                             cb({
                                 code: 200,
                                 message: "Admin Registration is successfull.",
                             });
                 
                     });
                   })
                } else {
                 cb({
                     code: 403,
                     message: "Admin already exists into database",
                 })
                }
              
             });
        }

    },
    authenticate: (admin, cb) => {
        if(!admin.email) {
            cb({
                code: 403,
                message: "Admin email is Empty",
            })
        }
        else if(!admin.password) {
            cb({
                code: 403,
                message: "Admin password is Empty",
            })
        } else {
            console.log('this is admin', admin)
            Admin.findOne({where:{email: admin.email}}). then((result) => {
                
                if(result == null) {
                   cb({ 
                    output: 'error',
                    code: 401, 
                    message: 'Authentication failed, User not found',
                    token: null
                  });
                } else {
                    let newAdmin =result.get({plain: true});
        
                    bcrypt.compare(admin.password, result.get('password'), (err, hasData) => {
                        if (hasData) {
                          var token = jwt.sign(newAdmin, process.env.JWT_APP_SECRETE, {
                            expiresIn: "12h"
                          });
                      
                          Admin.update({isLogin:1},
                             {where: {id: newAdmin.id}})
                          .then(res => {
                            cb({
                                output: 'success',
                                code: 200,
                                message: 'successfully created token',
                                token: token
                              })
                          })
                         
                        } else {
                          cb({ 
                              output: 'error',
                              code: 403,
                              message: 'Authentication failed, Passoword mismatched',
                              token: null
                          })
                        }
                      })
                }
          });
        }
     
    },
    checkAuthenticateAdmin: (req, cb) => {
        var token = req.query.token || req.headers['x-access-token']
    
        if(token) {
          jwt.verify(token, process.env.JWT_APP_SECRETE, (err, decoded) => {
             if(err) {
               cb({
                 code: 403, 
                 message: 'Failed to authenticate with token....'
               });
             } else {
               req.decoded = decoded;
               
               if(decoded.isLogin == 1) {
                console.log('this is decoded',decoded);
                cb({
                    code: 200, 
                    message: 'Succesfully Authenticate.'
                  });
               } else {
               cb({
                    code: 403, 
                    message: 'Failed to authenticate with token....'
                  });
               }
              
             }
          });
        } else {
          cb({
            code: 403,
            message: 'No token provided.'
          });
        }
    },
    adminLogout: (cb, req) => {

        var token = req.query.token || req.headers['x-access-token']
    
        if(token) {
          jwt.verify(token, process.env.JWT_APP_SECRETE, (err, decoded) => {
             if(err) {
               cb({
                 code: 200
               });
             } else {
               req.decoded = decoded;
               
               if(decoded.isLogin == 1) {
                console.log('this is decoded',decoded);
                Admin.update({isLogin:0},
                    {where: {id: decoded.id}})
                 .then(res => {
                   cb({
                       code: 200
                     });
                 });
                
              }
            }
        });
    } else {
        cb({
            code: 200
        });
    }
        
    }
}

module.exports = AdminService
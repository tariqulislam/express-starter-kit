'use strict';
/**
* @swagger
* definitions:
*   invitetoken:
*     properties:
*       id:
*          type: integer
*       token:
*          type: string
*       expireDate:
*          type: object
*       isActive:
*          type: boolean
*/
module.exports = (sequelize, DataTypes) => {
  var invitetoken = sequelize.define('invitetoken', {
    token: DataTypes.STRING,
    expireDate: DataTypes.DATE,
    isActive: DataTypes.INTEGER
  }, {});
  invitetoken.associate = function(models) {
    // associations can be defined here
  };
  return invitetoken;
};
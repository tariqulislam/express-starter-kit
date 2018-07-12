'use strict';
/**
* @swagger
* definition:
*   Admin:
*     properties:
*       firstName:
*          type: string
*       lastName:
*          type: string
*       email:
*          type: string
*       password:
*          type: string
*       isLogin:
*          type: string
*/
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isLogin:DataTypes.INTEGER
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};
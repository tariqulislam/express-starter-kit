'use strict';
/**
* @swagger
* definitions:
*   User:
*     properties:
*       id:
*          type: integer
*       agentName:
*          type: string
*       loginAttempt:
*          type: integer
*/
/**
 * @swagger
 * definitions:
 *   Agent:
 *     properties:
 *       count:
 *         type: integer
 *       token:
 *         type: string
 *       agent:
 *         type: string 
 */
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    agentName: DataTypes.STRING,
    loginAttempt: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
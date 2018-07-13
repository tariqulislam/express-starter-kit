'use strict';
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
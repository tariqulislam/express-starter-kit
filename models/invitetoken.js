'use strict';
module.exports = (sequelize, DataTypes) => {
  var invitetoken = sequelize.define('invitetoken', {
    token: DataTypes.STRING,
    expireDate: DataTypes.STRING,
    isActive: DataTypes.INTEGER
  }, {});
  invitetoken.associate = function(models) {
    // associations can be defined here
  };
  return invitetoken;
};
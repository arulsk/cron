const Sequelize = require('sequelize');
const sequleize = require('../config/db');

const userAuth = sequleize.define("userAuth", {
    userName: { type: Sequelize.STRING },
    userEmail: { type: Sequelize.STRING },
    userpassword: { type: Sequelize.STRING },
},{
    timestamps: false,
  });

module.exports = userAuth;

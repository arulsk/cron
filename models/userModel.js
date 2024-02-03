const Sequelize = require('sequelize');
const sequleize = require('../config/db');

const userAuth = sequleize.define("JWT", {
  
    userName: { type: Sequelize.STRING },
    userEmail: { type: Sequelize.STRING },
    userpassword: { type: Sequelize.STRING },
    role : {type : Sequelize.STRING}

},{
    timestamps: false,
  });


const userAuthentiacte = async(userEmail,userPassword,role) => {
  return await userAuth.findOne({
    where: {
      userEmail: userEmail,
      userpassword: userPassword,
      role : role
    },        
  });
  }
module.exports = {userAuth,userAuthentiacte};
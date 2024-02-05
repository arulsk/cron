const userAuthPage = require('./userAuthPages')
const admin = require('./admin')
const user = require('./userPage')
const crud = require('./crudOp')
const impExcel = require('./importExcel')
const signUpPage = userAuthPage.signUp;
const loginPage = userAuthPage.login;
const refreshPage = userAuthPage.refresh;
const secret_token = userAuthPage.secret_token;
const adminPage = admin.protected;
const userPage = user.user;
const getUsers = crud.getUsers;
const getUserById = crud.getUserById;
const updateUser = crud.updateUser;
const deleteUser = crud.deleteUser;
const importExcel = impExcel.readExcel;

module.exports  = {loginPage,refreshPage,secret_token,adminPage,userPage,signUpPage,getUsers,getUserById,updateUser,deleteUser,importExcel}
  
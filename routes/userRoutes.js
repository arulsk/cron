const express = require("express");
const route = express.Router();
const mainController = require("../controllers/mainController");
const authenticate_token = require("../middleware/authToken");

route.post('/signUp',mainController.signUpPage);
route.post('/login',mainController.loginPage);
route.post('/refresh',mainController.refreshPage);
route.post('/importExcel',mainController.importExcel)
route.get('/getUsers',authenticate_token('admin'),mainController.getUsers);
route.get('/getUserById/:id',authenticate_token('admin'),mainController.getUserById);
route.get('/admin',authenticate_token('admin'),mainController.adminPage);
route.get('/user',authenticate_token('user'),mainController.userPage);
route.put('/updateUser/:id',mainController.updateUser);
route.delete('/deleteUser/:id',authenticate_token('admin'),mainController.deleteUser);


module.exports = route;
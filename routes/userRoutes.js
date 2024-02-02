const express = require("express")
const route = express.Router()
const user = require("../controllers/userControl")
const authenticate_token = require("../middleware/authToken")

route.post('/login',user.login)
route.post('/refresh',user.refresh)
route.get('/protected',authenticate_token,user.protected)

module.exports = route
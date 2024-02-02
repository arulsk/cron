const express = require('express')
const  route  = require('./routes/userRoutes')
const sequelize = require('sequelize')
const userAuth = require('./models/userModel')
const app = express()
const port = 4000

app.use(express.json())
userAuth.sync()
app.use('/jwt',route)


app.listen(port,() => console.log(port))
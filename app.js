const express = require('express')
const  route  = require('./routes/userRoutes')
const app = express()
const port = 4000

app.use(express.json())
app.use('/jwt',route)


app.listen(port,() => console.log(port))
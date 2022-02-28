const express = require('express')
const cors = require('cors')

const mongo = require('./connect')
const { signup, signin } = require('./modules/register')
const app =express()

app.use(cors())
app.use(express.json())

mongo.connect()
app.get('/',(req,res)=>{
   res.send("Home Page")
})
app.post('/signup',signup)
app.post('/signin',signin)
app.listen(process.env.PORT || 8000,()=>{
   console.log("Started");
})
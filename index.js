const express = require('express');
require('dotenv').config()
const port = 4000
const app = express()


app.get('/',(req , res) => {
    res.send("hello world")
})
app.get('/india',(req , res) => {
    res.send("hello world india")
})

app.listen(process.env.PORT , () => {
    console.log(`listing on port ${process.env.PORT}`)
})
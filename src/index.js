import dotenv from "dotenv";
dotenv.config({path:'./env'})

import { app } from "./app.js"

import connectDB from "./db/index.js";


connectDB()
.then(() =>{
    app.on("error",(error) =>{
        console.log("error",error)
        throw error
    })
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`server started at port :${process.env.PORT}`)
    })
})
.catch((error) =>{

})

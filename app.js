const express = require('express')
const cloudinary = require('cloudinary');
const app = express()
const dotenv = require("dotenv");

dotenv.config({path:'./.env'})
const web = require('./routes/web')
const fileUpload = require("express-fileupload");
const connectDb =  require('./db/connectDb')
const cookieparser = require('cookie-parser')



var cors = require('cors')
app.use(cors())

//for file uplode
app.use(fileUpload({useTempFiles: true}));
// for dataget in api

app.use(express.json())
app.use(cookieparser()) // FOR SAVE COOKIES
connectDb()





//load router
app.use('/api',web)
// localhost:4000/api













// server create
app.listen(process.env.PORT,()=>{
         console.log(`server running on localhost: ${process.env.PORT}`)                  
})
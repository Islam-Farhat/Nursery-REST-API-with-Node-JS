const express = require("express");
const teacherRoute = require("./Routes/teacherRoute")
const childRoute = require("./Routes/childRoute")
const authenticationRoute = require("./Routes/authonticationRoute")
const authorization = require("./core/Authorization/authorization")
require("dotenv").config()

//create http server
const server = express();
var morgan = require('morgan');
const classRoute = require("./Routes/classRoute");
const { default: mongoose } = require("mongoose");

let port = process.env.PORT || 8080;

///////////////////////////////////
//Connect to Mongodatabase
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://mo:qwertyu@nurserysystem.jbbr72b.mongodb.net/test")
    //mongoose.connect("mongodb+srv://Islam:lomafarhat@sandbox.ujxl2zx.mongodb.net/test")

.then(() => {
    console.log("DataBase Connected.....")
    server.listen(port, () => {
        console.log("Server is listening with port:", port)
    })
}).catch(error => {
    console.log("DataBase Error!" + error)
})


////////////////////////////


server.use(morgan("tiny"))
morgan(':method :url :status :res[content-length] - :response-time ms')

/////////////////////////
//EndPoints Routes 
server.use(express.json())
// server.use(authenticationRoute);
// server.use(authorization);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

/////////////////////////

//Not Found
server.use((request, response, next) => {
    response.status(404).json({ message: "Page Not Found" })
})

//
server.use((error, request, response, next) => {
    response.status(500).json({ message: error + " " })
})
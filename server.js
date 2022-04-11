// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const host = "127.0.0.1";
const port = process.env.PORT || 3000;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Setup Server
// fetch data from client then save it in our end point
app.post("/add",(req,res)=>{
    
       projectData['date'] = req.body.date;
       projectData['name'] = req.body.name;
       projectData['feel'] = req.body.feel;
       projectData['temp'] = req.body.temp;

    console.log(projectData);
    res.end();
});

//route to send our endpoint's data tothe client
app.get("/all",(req,res)=>{
    res.send(projectData);
});


//srver running url
app.listen(port,host,()=>{
    console.log(`Server Running On http://${host}:${port}/`);
})
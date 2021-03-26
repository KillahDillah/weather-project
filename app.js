const express = require("express");
const https = require("https"); // native way to make API requests

const app = express();

app.get("/", function(req, res){
  const url = "https://api.weatherapi.com/v1/current.json?key=14b16247a3ae4236b0e220244212603&q=89135&aqi=yes";
  https.get(url, function(response){
    console.log(response);
  })
  res.send("Server up and running")
})



app.listen(3000, function(){
  console.log("Served!");
})

const express = require("express");
const https = require("https"); // native way to make API requests

const app = express();

app.get("/", function(req, res){
  const url = "https://api.weatherapi.com/v1/current.json?key=14b16247a3ae4236b0e220244212603&q=89135&aqi=yes";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){  //search through the response
      const weatherData = JSON.parse(data); //returns data into a JSON object. opposite would be JSON.stringify() to compact an object
      const temp_f = weatherData.current.temp_f;
      const temp_c = weatherData.current.temp_c;
      const wind_kph = weatherData.wind_kph;
      const wind_mph = weatherData.wind_mph;


    })  
  })
  res.send("Server up and running")
})



app.listen(3000, function(){
  console.log("Served!");
})

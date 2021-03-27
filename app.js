const express = require("express");
const https = require("https"); // native way to make API requests

const app = express();

app.get("/", function(req, res){
  const locationQuery = 89135;
  const apiKey = "14b16247a3ae4236b0e220244212603";
  const url = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + locationQuery + "&aqi=yes";
  https.get(url, function(response){
    
    response.on("data", function(data){  //search through the response
      const weatherData = JSON.parse(data); //returns data into a JSON object. opposite would be JSON.stringify() to compact an object
      const temp_f = weatherData.current.temp_f;
      const temp_c = weatherData.current.temp_c;
      const wind_kph = weatherData.current.wind_kph;
      const wind_mph = weatherData.current.wind_mph;

      const icon =  weatherData.current.condition.icon;
      
      res.write("<p>Wind speed in KPH is " + wind_kph + ", which is " + wind_mph + " in MPH.</p>");
      res.write("<p>The temperature in Celsius is "+ temp_c + ". Which is " + temp_f + " in Fahrenheit.</p>");
      res.write("<img src='" + icon + "' />");
      // can only have 1 'res.send' - use 'res.write' to write multiple
      res.send();
    })  
  })

  // res.send("Server up and running")
})



app.listen(3000, function(){
  console.log("Served!");
})

const express = require("express");
const https = require("https"); // native way to make API requests
const bodyParser = require("body-parser");  // pkg to look through the body of request and fetch data based on the name of input

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html');
})

app.post("/", function(req,res){ 

  const locationQuery = req.body.location;
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
      res.write("<p>The temperature in <b>" + locationQuery + "</b> Celsius is "+ temp_c + ". Which is " + temp_f + " in Fahrenheit.</p>");
      res.write("<img src='" + icon + "' />");
      // can only have 1 'res.send' - use 'res.write' to write multiple
      res.send();
    })  
  })
})


app.listen(3000, function(){
  console.log("Served!");
})

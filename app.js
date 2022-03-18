
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

});


app.post("/", (req, res) => {
  // console.log(req.body.cityname);
    const query = req.body.cityname;
    const apiKey = `0186a847017704a499b0cbbafda203ce`;
    const mode = `standard`;
    const units = `metric`;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${query}&mode=${mode}&units=${units}`;

  // To avoid errors the url variable must always hav
    https.get(url, (response) => {
      console.log(response.statusCode);
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);

        // console.log(weatherData);
        // res.send(weatherData);

        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const imageURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        res.write(`<p>The weather is ${weatherDescription}</p>`);
        res.write(`<h1>The temperature in ${query} is ${temp} degrees celcius</h1>`);
        res.write(`<img src="${imageURL}">`);
        res.send();
        // console.log(weatherDescription);
      });

    });
});



  

app.listen(5000, () => {
  console.log(`app is listening at port 5000`);
});

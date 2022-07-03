const express = require("express");
const hbs = require("hbs");

const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const getWeather = require("./utils/getWeather");
const { response } = require("express");

const static = path.join(__dirname, "./static");
const views = path.join(__dirname, "./template/views");
const partials = path.join(__dirname, "./template/partials");

app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partials);
app.use(express.static(static));
// app.use('/static', express.static('static'));

app.get("/", (req, res)=>{
    res.render("index.hbs", {
        title: "Weather App",
        header: "Weather App"
    });
});

app.get("/weather", (req, res)=>{
    const city = req.query.city;
    if(!city){
        return res.send({
            error : "Must enter city name to get data!"
        });
    }

    getWeather(city, (error, {body})=>{
        if(error){
            return res.send({body});
        }
        // console.log(body);
        res.send({body});   
    });
})

app.get("*", (req, res)=>{
    res.send("page not found");
})

app.listen(port, (req, res)=>{
    console.log(`Server is up and running on port ${port}`);
})
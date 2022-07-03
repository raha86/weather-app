const request = require("request");

const getWeather = (city, callback) => {
    const apiKey = '1091064b2933bb1b86d5aecb13fd6018';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=metric&appid=${apiKey}`;
    // console.log(url);
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback("unable to fetch data", undefined);
        }else{
            callback(undefined, {body});
        }
    });
}

module.exports = getWeather;





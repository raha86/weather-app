const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const dateElement = document.querySelector(".date");
const timeElement = document.querySelector(".digit");
const timeFormat = document.querySelector(".format");

let weather = {
    fetchWeather:function(city){
        const fetchUrl = "/weather"+"?city="+city;
        fetch(fetchUrl).then(response => response.json())
        .then((data)=>this.displayWeather(data));
    },

    search:function(){
        this.fetchWeather(searchBar.value);
    },

    updateDateTime:function(lon, lat){
        const dateTimeApi = "5e3ced2c05ea4b6ab2c2064adcc167ec";
        const dateTimeUrl = `https://api.ipgeolocation.io/timezone?apiKey=${dateTimeApi}&lat=${lat}&long=${lon}`;
        fetch(dateTimeUrl).then(response => response.json())
        .then((data) => {
            const {date_time_wti, time_12} = data;
            dateElement.textContent = date_time_wti.substring(5, 7) + "," + date_time_wti.substring(8, 11);
            timeElement.textContent = time_12.substring(0,5);
            timeFormat.textContent = (time_12.substring(9, 11)=="AM"?"am":"pm");
        });      
    },

    displayWeather:function(data){
        const {cod} = data.body;
        if(cod == 404){
            document.querySelector(".msg").style.display = "block";
            document.querySelector(".msg").textContent = "City not found";
            document.querySelector(".curReport").style.display = "none";
            document.querySelector(".extraData").style.display = "none";
            document.querySelector(".timing").style.display = "none";
        }else{
        const {lon, lat} = data.body.coord;
        const {temp, pressure, humidity} = data.body.main; 
        const {description, icon} = data.body.weather[0];
        const {speed} = data.body.wind;
        const {name} = data.body;
        const {country} = data.body.sys;

        document.querySelector(".msg").style.display = "none";
        document.querySelector(".curReport").style.display = "grid";
        document.querySelector(".extraData").style.display = "grid";
        document.querySelector(".timing").style.display = "grid";

        document.querySelector(".temp").textContent = (temp - 273).toFixed(2) + "°C";
        document.querySelector(".desc").textContent = description;
        document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
        document.querySelector(".wind").innerHTML = `<h3>${speed} Kmph</h3>
        <p>wind</p>`;
        document.querySelector(".humid").innerHTML = `<h3>${humidity} %</h3>
        <p>humidity</p>`;
        document.querySelector(".pres").innerHTML = `<h3>${pressure} mbar</h3>
        <p>pressure</p>`;
        document.querySelector(".place").textContent = name + ", " + country;

        this.updateDateTime(lon, lat);
        }
    
    }
    
}

searchBar.addEventListener("keypress", function(event){
    if(event.key=="Enter"){
        document.querySelector(".msg").textContent = "Loading...";
        weather.search();
    }
});
searchBtn.addEventListener("click", function(){ 
    document.querySelector(".msg").textContent = "Loading...";
    weather.search();
});

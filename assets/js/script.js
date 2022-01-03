var apiKey = "733003f902b435aff7ba3aae5ba752e6";
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var citySearchTerm = document.querySelector("#weather-locaiton");
var lat = "";
var lon = "";

var getWeatherInfo = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    fetch(apiUrl) 
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data,location); 
        });
    });
};

var displayWeather = function(weather, location){
    //clear old content
    forecastContainerEl.textContent="";
    citySearchTerm.textContent= location;
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    
    console.log(lon);
    console.log(lat);
    console.log(weather);
    console.log(location);
};


var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if(city){
        getWeatherInfo(city);
        cityInputEl.value = "";
    }
    else{
        alert("Please enter a City");
    }
};
userFormEl.addEventListener("submit", formSubmitHandler);
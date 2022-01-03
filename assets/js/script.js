var apiKey = "733003f902b435aff7ba3aae5ba752e6";
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var citySearchTerm = document.querySelector("#weather-locaiton");
var lat = "";
var lon = "";

var getLocationInfo = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    fetch(apiUrl) 
    .then(function(response){
        response.json().then(function(data){
            getLonLatLoc(data,location); 
        });
    });
};
//This will now get the weather information from the onecall api
var getWeatherInfo = function(lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lon + "&lon=" + lat + "&appid=" + apiKey
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
   
    /*fetch(weatherApiUrl) 
    .then(function(secondResponse){
        secondResponse.json().then(function(weatherData){
           //START HERE AND LOOK AT MODULE FOR CREATING THIS AGAIN
           
            getLonLatLoc(data,location); 
        });
    });*/
};


var getLonLatLoc = function(weather, location){
    //clear old content
    forecastContainerEl.textContent="";
    citySearchTerm.textContent= location;
    //gets lat and lon coord

    var lon = weather.coord.lat;
    var lat = weather.coord.lon;
    
    console.log(lon);
    console.log(lat);
    console.log(weather);
    console.log(location);
    getWeatherInfo(lon, lat);
};


var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if(city){
        getLocationInfo(city);
        cityInputEl.value = "";
    }
    else{
        alert("Please enter a City");
    }
};
userFormEl.addEventListener("submit", formSubmitHandler);


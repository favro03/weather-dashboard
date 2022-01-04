var apiKey = "733003f902b435aff7ba3aae5ba752e6";
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var citySearchTerm = document.querySelector("#weather-locaiton");
var ulElement =document.getElementById('list');

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

var getLonLatLoc = function(weather, location){
    //clear old content
    forecastContainerEl.textContent="";

    //converting unix to human date
    var unixTimestamp = weather.dt;
    var milliseconds = unixTimestamp * 1000;
    var dateObject = new Date(milliseconds);
    var humanDateFormat = dateObject.toLocaleDateString("en-US", {month: "numeric"} + "/" +{day: "numeric"} + "/" + {year: "numeric"});
    
    //getting icon
    var iconId = weather.weather[0].icon;
    var icon = "http://openweathermap.org/img/w/" + iconId + ".png";
    
   

    citySearchTerm.textContent= weather.name + " (" + humanDateFormat + ") ";
    document.getElementById('icon').src = "http://openweathermap.org/img/w/"+ iconId +".png";
    
    
    //gets lat and lon coord

    var lon = weather.coord.lat;
    var lat = weather.coord.lon;
    console.log(icon);
    console.log(lon);
    console.log(lat);
    console.log(weather);
    console.log(location);
   
    getWeatherInfo(lon, lat);
};


//This will now get the weather information from the onecall api
var getWeatherInfo = function(lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lon + "&lon=" + lat + "&units=imperial&appid=" + apiKey
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayWeather(data);
        });
    });
};
var displayWeather = function(getWeather){
    console.log(getWeather);
    var temp = document.createElement("li");
    temp.textContent = "Temp: " + getWeather.current.temp + "℉";
    ulElement.appendChild(temp);

    var windSpeed = document.createElement("li");
    windSpeed.textContent = "Wind: " + getWeather.current.wind_speed + " MPH";
    ulElement.appendChild(windSpeed);

    var humidity = document.createElement("li");
    humidity.textContent = "Humidity: " + getWeather.current.humidity + " %";
    ulElement.appendChild(humidity);

    var uvIndex = document.createElement("li");
    uvIndex.textContent = "UV Index: " + getWeather.current.uvi;
    ulElement.appendChild(uvIndex);
    ulElement.style.width = "200px";
    var uv=getWeather.current.uvi;

    if (uv > 0 && uv < 3){
        uvIndex.style.backgroundColor = "green";
    }
    else if (uv > 2 && uv < 6){
        uvIndex.style.backgroundColor = "yellow";
    }
    else if (uv>5 && uv<8){
        uvIndex.style.backgroundColor = "orange";
    }
    else if (uv>7 && uv<11){
        uvIndex.style.backgroundColor = "red";
    }
    else if(uv >10){
        uvIndex.style.backgroundColor = "purple";
    }
    
};



var formSubmitHandler = function(event){
    event.preventDefault();
    ulElement.textContent=""
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


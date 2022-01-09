var apiKey = "8469f67817c39bdbdcd2e3b3fa5868b0";
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var citySearchTerm = document.querySelector("#weather-locaiton");
var ulElement =document.getElementById('list');
var dataEl = document.getElementById('data');
var historyContainer = document.querySelector("#historyContainer");
var lat = "";
var lon = "";
var unixTimestamp=0;
var historyArr =[];
var futureContainer = document.getElementById('future-container');

//function to get the location from the history searches
var getButtonVar = function(){
    var currentCity = getButtonVar.caller.arguments[0].target.id;
    var historyCity = (document.getElementById(currentCity).value);
    getLocationInfo(historyCity);
    dataEl.style.display = "block";
}
//Display History searches
var displaySearchHistory=function(historyArr){ 
    var uniqueArr = [...new Set(historyArr)];
    historyArr = uniqueArr;

    for(var i = 0; i<historyArr.length; i++){
        var historyBtn = document.createElement("input");
        historyBtn.classList = "btn-history flex-row justify-space-between align-center";
        historyBtn.type = "button";
        historyBtn.name = "button" + i;
        historyBtn.value = historyArr[i];
        historyBtn.id = i;
        historyBtn.setAttribute("onClick","getButtonVar()");
        document.getElementById('historyContainer').appendChild(historyBtn);
    };
};

var clearData = function(){
    ulElement.textContent="";
    futureContainer.textContent="";
   
};
//loads search history on page load
window.onload = function(){
    if(localStorage.getItem("city") === null){
        historyContainer.textContent = "No Cities Searched";
    }
    else {
        var retrieveData = localStorage.getItem("city");
        historyArr = JSON.parse(retrieveData);
        displaySearchHistory(historyArr);
    }
};

//local storage
var locationStorage = function(cityName){
    historyContainer.textContent="";
    historyArr = JSON.parse(window.localStorage.getItem("city")) || [];
    var value = cityName;
    if(historyArr.indexOf(value)== -1){
        historyArr.push(value);
    }
    displaySearchHistory(historyArr);
    localStorage.setItem("city", JSON.stringify(historyArr));
};
//takes the search input and gets the location/weather info
var getLocationInfo = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                getLonLatLoc(data,location); 
            });
        }
        else{
            alert('Error: City Name Not Found');
            dataEl.style.display = "none";
        }
    })
    .catch(function(error){
        alert("Unable to connect to open weather map");
    });
    clearData();
};

//this function will convert time
var unixTimeConverter = function(unixTime){
    var milliseconds = unixTime * 1000;
    var dateObject = new Date(milliseconds);
    var humanDateFormat = dateObject.toLocaleDateString("en-US", {month: "numeric"} + "/" +{day: "numeric"} + "/" + {year: "numeric"});
    return humanDateFormat;
 };

 //function to retreive the weather icon
var weatherIcon = function(id, iconId){
    document.getElementById(id).src = "http://openweathermap.org/img/w/"+ iconId +".png";
};

//function to get the the longitute and latitude to feed the onecall api
var getLonLatLoc = function(weather, location){
    //variable for date
    unixTimestamp = weather.dt;
    //variable for icon
    var iconId = weather.weather[0].icon;  
    //display city name and date
    citySearchTerm.textContent= weather.name + " (" + unixTimeConverter(unixTimestamp) + ") ";
    weatherIcon('icon', iconId);
    //variable holding the city name and pushing that to storage
    var cityName = weather.name;
    locationStorage(cityName);
    //gets lat and lon coord
    var lon = weather.coord.lat;
    var lat = weather.coord.lon;
    getWeatherInfo(lon, lat);
};
 
//This will now get the weather information from the onecall api
var getWeatherInfo = function(lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lon + "&lon=" + lat + "&units=imperial&appid=" + apiKey
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data);
            });
        }
        else{
            alert('Error: Unable to Connect')
        }
    });
};

//displays all the weather information to the large and small cards
var displayWeather = function(getWeather){
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
//5 Day Forecast
    for(var i = 1; i<6; i++){
        var date = getWeather.daily[i].dt;
        var iconDay = getWeather.daily[i].weather[0].icon;

        //Variables for card
        var date = "(" + unixTimeConverter(date) + ")";    
        var iconDay = getWeather.daily[i].weather[0].icon;
            
        var temp = "Temp: " + getWeather.daily[i].temp.day + "℉";
        var wind = "Wind: " + getWeather.daily[i].wind_speed + " MPH";
        var humidity = "Humidity: " + getWeather.daily[i].humidity + " %";
        
        var elementContainer = document.createElement("div");
        elementContainer.classList = "col-md-2 small-card";
        
        var img = document.createElement("img");
        img.src = "http://openweathermap.org/img/w/"+ iconDay +".png";
               
        var futureContainerEl = document.createElement("div");

        var dataArr =[date,temp,wind,humidity];

        for(var j =0; j<dataArr.length; j++){
            var futureListEl = document.createElement("div");
            futureListEl.textContent = dataArr[j];
            futureListEl.appendChild(img);
            futureContainerEl.appendChild(futureListEl);
        }
        
        elementContainer.appendChild(futureContainerEl);
        futureContainer.appendChild(elementContainer);
    }       
};

var formSubmitHandler = function(event){
    event.preventDefault();
    clearData();

    var city = cityInputEl.value.trim();

    dataEl.style.display = "block";

    if(city){
        getLocationInfo(city);
        cityInputEl.value = "";
    }
    else{
        alert("Please enter a City");
        dataEl.style.display = "none";
    }
};
userFormEl.addEventListener("submit", formSubmitHandler);
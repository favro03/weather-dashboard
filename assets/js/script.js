var apiKey = "733003f902b435aff7ba3aae5ba752e6";
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#forecast-container");
var citySearchTerm = document.querySelector("#weather-locaiton");
var ulElement =document.getElementById('list');
var day1DateEl = document.querySelector("#day1Date");
var day2DateEl = document.querySelector("#day2Date");
var day3DateEl = document.querySelector("#day3Date");
var day4DateEl = document.querySelector("#day4Date");
var day5DateEl = document.querySelector("#day5Date");
var day1List = document.getElementById('day1List');
var day2List = document.getElementById('day2List');
var day3List = document.getElementById('day3List');
var day4List = document.getElementById('day4List');
var day5List = document.getElementById('day5List');
var dataEl = document.getElementById('data');
var lat = "";
var lon = "";
var unixTimestamp=0;


//load local storage searches function
window.onload = function(){
    searchHistory =localStorage.getItem("city")
    console.log(searchHistory);
};
//function to store data
var searchStorage = function(searchName){
    console.log(searchName);
    var searchHistory=[];
    searchHistory.push(searchName);
    var strArr = JSON.stringify(searchHistory);
    localStorage.setItem("city", strArr);
    console.log(searchHistory);
}

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
        //notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to open weather map");
    });

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

//function to the the longitute and latitude to feed the onecall api
var getLonLatLoc = function(weather, location){
    //clear old content
    forecastContainerEl.textContent="";

    //variable for date
    unixTimestamp = weather.dt;
    
    //variable for icon
    var iconId = weather.weather[0].icon;  
   
    citySearchTerm.textContent= weather.name + " (" + unixTimeConverter(unixTimestamp) + ") ";
    weatherIcon('icon', iconId);
    //weather city variable
    var searchName = weather.name;
    
    //gets lat and lon coord
    var lon = weather.coord.lat;
    var lat = weather.coord.lon;
    
    console.log(searchName);
    console.log(weather);
    console.log(location);
   
    getWeatherInfo(lon, lat);
    console.log(searchName);
    searchStorage(searchName);
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
//5 Day Forecast
//Day 1
    //Day 1 date
    var date1 = getWeather.daily[1].dt;
    var iconDay1 = getWeather.daily[1].weather[0].icon;
    day1DateEl.textContent = "(" + unixTimeConverter(date1) + ")";
    weatherIcon("icon1", iconDay1);
    //Day 1 temp
    var day1Temp = document.createElement("li");
    day1Temp.textContent = "Temp: " + getWeather.daily[1].temp.day + "℉";
    day1List.appendChild(day1Temp);
    //Day 1 Wind
    var day1WindSpeed = document.createElement("li");
    day1WindSpeed.textContent = "Wind: " + getWeather.daily[1].wind_speed + " MPH";
    day1List.appendChild(day1WindSpeed);
    //Day 1 Humidity
    var day1Humidity = document.createElement("li");
    day1Humidity.textContent = "Humidity: " + getWeather.daily[1].humidity + " %";
    day1List.appendChild(day1Humidity);

//Day 2
    //Day 2 Date
    var date2 = getWeather.daily[2].dt;
    var iconDay2 = getWeather.daily[2].weather[0].icon;
    day2DateEl.textContent = "(" + unixTimeConverter(date2) + ")";
    weatherIcon("icon2", iconDay2);
    //Day 2 temp
    var day2Temp = document.createElement("li");
    day2Temp.textContent = "Temp: " + getWeather.daily[1].temp.day + "℉";
    day2List.appendChild(day2Temp);
    //Day 2 Wind
    var day2WindSpeed = document.createElement("li");
    day2WindSpeed.textContent = "Wind: " + getWeather.daily[1].wind_speed + " MPH";
    day2List.appendChild(day2WindSpeed);
    //Day 2 Humidity
    var day2Humidity = document.createElement("li");
    day2Humidity.textContent = "Humidity: " + getWeather.daily[1].humidity + " %";
    day2List.appendChild(day2Humidity); 

//Day 3
    //Day 3 Date
    var date3 = getWeather.daily[3].dt;
    var iconDay3 = getWeather.daily[3].weather[0].icon;
    day3DateEl.textContent = "(" + unixTimeConverter(date3) + ")";
    weatherIcon("icon3", iconDay3);
    //Day 3 temp
    var day3Temp = document.createElement("li");
    day3Temp.textContent = "Temp: " + getWeather.daily[3].temp.day + "℉";
    day3List.appendChild(day3Temp);
    //Day 3 Wind
    var day3WindSpeed = document.createElement("li");
    day3WindSpeed.textContent = "Wind: " + getWeather.daily[3].wind_speed + " MPH";
    day3List.appendChild(day3WindSpeed);
    //Day 3 Humidity
    var day3Humidity = document.createElement("li");
    day3Humidity.textContent = "Humidity: " + getWeather.daily[3].humidity + " %";
    day3List.appendChild(day3Humidity); 


//Day 4
    //Day 4 Date
    var date4 = getWeather.daily[4].dt;
    var iconDay4 = getWeather.daily[4].weather[0].icon;
    day4DateEl.textContent = "(" + unixTimeConverter(date4) + ")";
    weatherIcon("icon4", iconDay4);
    //Day 4 temp
    var day4Temp = document.createElement("li");
    day4Temp.textContent = "Temp: " + getWeather.daily[4].temp.day + "℉";
    day4List.appendChild(day4Temp);
    //Day 4 Wind
    var day4WindSpeed = document.createElement("li");
    day4WindSpeed.textContent = "Wind: " + getWeather.daily[4].wind_speed + " MPH";
    day4List.appendChild(day4WindSpeed);
    //Day 4 Humidity
    var day4Humidity = document.createElement("li");
    day4Humidity.textContent = "Humidity: " + getWeather.daily[4].humidity + " %";
    day4List.appendChild(day4Humidity); 

//Day 5
    //Day 5 Date
    var date5 = getWeather.daily[5].dt;
    var iconDay5 = getWeather.daily[5].weather[0].icon;
    day5DateEl.textContent = "(" + unixTimeConverter(date5) + ")";
    weatherIcon("icon5", iconDay5);
    //Day 5 temp
    var day5Temp = document.createElement("li");
    day5Temp.textContent = "Temp: " + getWeather.daily[5].temp.day + "℉";
    day5List.appendChild(day5Temp);
    //Day 5 Wind
    var day5WindSpeed = document.createElement("li");
    day5WindSpeed.textContent = "Wind: " + getWeather.daily[5].wind_speed + " MPH";
    day5List.appendChild(day5WindSpeed);
    //Day 5 Humidity
    var day5Humidity = document.createElement("li");
    day5Humidity.textContent = "Humidity: " + getWeather.daily[5].humidity + " %";
    day5List.appendChild(day5Humidity); 
};




var formSubmitHandler = function(event){
    event.preventDefault();
    ulElement.textContent="";
    day1DateEl.textContent ="";
    day1List.textContent = "";
    day2DateEl.textContent ="";
    day2List.textContent = "";
    day3DateEl.textContent ="";
    day3List.textContent = "";
    day4DateEl.textContent ="";
    day4List.textContent = "";
    day5DateEl.textContent ="";
    day5List.textContent = "";

    var city = cityInputEl.value.trim();

    dataEl.style.display = "block";

    if(city){
        getLocationInfo(city);
        cityInputEl.value = "";
    }
    else{
        alert("Please enter a City");
    }

    
    
};
userFormEl.addEventListener("submit", formSubmitHandler);
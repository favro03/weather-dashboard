var apiKey = "733003f902b435aff7ba3aae5ba752e6";

var getWeatherInfo = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=" + apiKey;
    fetch(apiUrl) 
    .then(function(response){
        response.json().then(function(data){
            console.log(data);
        })     ;
    });
};
getWeatherInfo();
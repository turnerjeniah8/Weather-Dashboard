//data to the HTML
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

for (var i = 0; i < localStorage.length; i++){

var city = localStorage.getItem(i);

var cityName = $("cityList").addClass("list");

cityName.append("<li>" + city + "</li>");
}


var searchButton = $("search-btn");
var apiKey = "e2cc785eba7e1f626779ab62c981b3aa";

//for local storage
var keyCount = 0;

//search key event
searchButton.click(() =>{
var cityInput = $(".input").val();

//current weather variable 
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";

//5day weather variable 
var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";

if (cityInput == ""){
    console.log(cityInput);
} else {
    $.ajax({
        url: currentWeather, 
        method: "GET"
    }) .then((response) => {
        var cityName = $(".list-group").addClass("list");
        cityName.append("<li>" + response.name + "</li>")
        
        //local storage
        var local = localStorage.setItem(keyCount, response.name);
        keyCount = keyCount +1;

        //current weather append
        var current = $(".currentWeather").append("<div>").addClass("card");
        current.empty();
        var currentName = current.append("<p>");

        //append current city with current city name
        current.append(currentName);

        //Date
        var time= new Date(response.dt*1000);
        currentName.append(response.name + " " + time.toLocaleDateString("en-US"));
        currentName.append('<img src= "https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">');

        //temperature
        var currentTemperature = currentName.append("<p>");

        currentName.append(currentTemperature);
        currentTemperature.append("<p>" + "Temperature: " + response.main.temperature + "</p>");

        //wind speed
        currentTemperature.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        //UV Index URL
        var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=e2cc785eba7e1f626779ab62c981b3aa&lat=${response.coord.lat}&lon=${response.coord.lon}";

        //UV index 
        $.ajax({
            url: uvIndex,
            method: "GET"
        }) . then(function(response) {

            var currentUVIndex = currentTemperature.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-content");
            currentUVIndex.addClass("UV");
            currentTemperature.append(currentUVIndex);
        });
    });
    //5 day forecase
    $.ajax({
        url: fiveDay, 
        method: "GET"
    }).then(function(response) {
        var day = [0, 8, 16, 24, 32];
        var fiveDayCard = $(".futureWeather").addClass("card");
        var fivedayDiv = $(".card1").addClass("card-content");
        fivedayDiv.empty();
        day.forEach( (i) => {
            var UTC1 = new Date(response.list[i].dt*1000);
            UTC1 = UTCq.toLocaleDateString("en-US");

            fivedayDiv.append("<div class=card1" + "<p>" + UTC1 + "</p>" + "<img src=https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png"> + "<p" + "Temperature:" + response.list[i].main.temperature + "</p>" + "<p>" + "humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>" );
        })
    });
    
}

});

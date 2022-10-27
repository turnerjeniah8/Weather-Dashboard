//declaring a variable to store the searches
var city = "";

//variable list
var searchButton = $("#search-btn");
// clearButton = $("#clear-history");
var currentCity = $("#currentCity");
var currentTemperature = $("#temperature");
var currentWindSpeed = $("#wind");
var currentHuminity = $("#humidity");
var currentUvIndex = $("#uv-index");
var citySearch= $("#citySearch");
//city array
var citys = [];

//searches to make sure the city is valid
function find(c){
    for (var i=0; i<citys.length; i++){
        if (c.toUpperCase()===citys[i]){
            return -1;
        }
    }
    return 1;
}

//Api key
var APIkey="e2cc785eba7e1f626779ab62c981b3aa";

//display weather function
function displayWeather(event){
    event.preventDefault();
    if (citySearch.val().tri()!==""){
        city= citySearch.val().trim();
        currentWeather(city);
    }
}


//current weather function
function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method: "GET", 
    }).then(function(response){
        //going to console log the results. now I need to get the weather and data icon to display on the page
        console.log(response);
        //using the weather API to get icons
        var weatherIcon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        var date= new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name+"("+date+")" + "<img src="+iconurl+">");
    })
    //now I need to convert the temperature to fahrenheit
    //finish wind speed, UV index, and Humidity
    //JSON the responses to the local storage
    //make my buttons functional
    //load past searched cities
    //do a clear history function
}
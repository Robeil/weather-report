$(document).ready(function () {
    // apiKey 
    var apikey = "fe0f799b6721a0dd5bd4752f1b8feb31";

    var citties = [];
    // to retrive the city
    var cittyArr = JSON.parse(localStorage.getItem("cities"));
    //
    //var cityArr = JSON.parse(localStorage.getItem("Cities"));

    // Variable stating index of city in cityArr
    var cityIndex = "";
   
    //var city = "";
    //
    var searchButton = document.getElementById("search-button");
    //
    searchButton.addEventListener("click", displayWeather);

    function displayWeather(event) {
        event.preventDefault();
        var city = $("#city").val().trim();

        // first ajax call to get city data
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=imperial"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var img = $("<img>")
            var iconurl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            img.attr("src", iconurl)
            $("#weather-display").append(img);
            $(".name").text(response.name);
            $(".date").text(new Date(response.dt * 1000).toLocaleDateString())


        })
            //queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?" + response.city + "&appid=" + apikey + "&units=imperial"
            queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + "&lon="+ "&appid=" + apikey
        
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
        
                    iconurl = "http://openweathermap.org/img/w/" + response.weather.main + ".png";
                    img.attr("src", iconurl)
                    $("#weather-display").append(img);
                    $(".main").text(response.main);
                    $(".date").text(new Date(response.dt * 1000).toLocaleDateString())
                    //uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        
                  //  queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?" + response.coord.name + "&appid=" + apikey
                })
        

    };

});
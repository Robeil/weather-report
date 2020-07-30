$(document).ready(function () {
    // apiKey 
    var apikey = "fe0f799b6721a0dd5bd4752f1b8feb31";

    var citties = [];
    // to retrive the city
    //var cittyArr = JSON.parse(localStorage.getItem("cities"));
    //
    var cityArr = JSON.parse(localStorage.getItem("Cities"));

    // Variable stating index of city in cityArr
    var cityIndex = "";

    // Today's date
    var today = new Date();

    // Variable date for 5 day forecast (day)
    var fiveDay = "";

    // Variable date for 5 day forecast (month)
    var fiveMonth = "";

    // Variable date for 5 day forecast (year)
    var fiveYear = "";

    var date = {
        day: today.getDate(),
        month: (today.getMonth() + 1),
        year: today.getUTCFullYear()
    }

    // Formatted today's date
    var todayDate = date.month + "/" + date.day + "/" + date.year;

    // function to display clickable buttons with city names in aside tag
    function displayBtns() {

        $("#button-container").empty();

        for (i = 0; i < cityArr.length; i++) {

            // Creates city button for aside tag
            var cityBtn = $("<button>");

            // Creates city button remove selector 'x'
            var removeBtn = $("<i>");

            cityBtn.addClass("city-buttons btn");

            removeBtn.addClass("fa fa-times");

            removeBtn.attr("aria-hidden", "true");

            cityBtn.attr("data-name", cityArr[i]);

            removeBtn.attr("data-name", cityArr[i]);

            cityBtn.text(cityArr[i]);

            cityBtn.append(removeBtn);

            $("#button-container").append(cityBtn);

        }

    }

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
            //queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?" + response.city + "&appid=" + apikey + "&units=imperial"
            queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + apikey + "&units=imperial"
            console.log(img);
        
        
        
        })


        // 
/*
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            iconurl1 = "http://openweathermap.org/img/w/" + response.weather.main
            img.attr("src", iconurl)
            $("#weather-display").append(img);
            $(".main").text(response.main);
            $(".date").text(new Date(response.dt * 1000).toLocaleDateString())
            //uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;

            queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?" + response.coord.name + "&appid=" + apikey
        })
*/

    };

});
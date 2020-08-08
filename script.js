$(document).ready(function () {
    // apiKey 
    var apikey = "fe0f799b6721a0dd5bd4752f1b8feb31";

    // Variable for user-selected city used in Ajax calls
    var city = [];

    // Variable for UV Ajax call URL     take a look again .................................
    //var uvURL = "";

    //var cityArr =(localStorage.setItem("cities", cityArr));
    var cityArr = JSON.parse(localStorage.getItem("city"));

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

    // adding addeventlistener to search button
    var searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", displayWeather);

    // function that makes city-specific Ajax calls for current conditions and UV index
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

            img.attr("id", "date")

            var cityDate = $("<h3>");

            cityDate.attr("id", "weather-psiplay");

            cityDate.text(response.name + " " + "(" + new Date(response.dt * 1000).toLocaleDateString() + ")");

            $("#today-temp").text("Temperature:" + " " + response.main.temp + " " + "°F ");

            $("#today-humidity").text("Humidity:" + " " + response.main.humidity + " " + " % ");

            $("#wind").text("Wind:" + " " + response.wind.speed + " " + " MPH ");

            $("#uv").text("UV Index:" + " " + response.main.temp);

            $("#uv").css("color", "red");

            $("#today-head-container").append(cityDate);

            $("#today-head-container").append(img);


            // function that executes Ajax call for 5 day weather forecast
            function fiveDayWeather() {

                var city = $("#city").val().trim();

                var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apikey + "&units=imperial";

                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function (response) {

                    console.log(response);

                    $("#five-day-forecast").empty();
                    $("h4").text("5-day Forecast");
                
                    $("#five-day-forecast").text("5 Day Forecast");
                    $("#five-day-forecast").addClass("row");

                    for (i = 0; i < response.list.length; i++) {  //

                        //var hour = response.list[i].dt_txt.split(" ")[1] 

                       var dayArray = response.list[i].dt_txt.split(" ")
                        console.log("dayArray.",dayArray);
                        //day hour
                        //console.log(hour);

                        if (dayArray[1] === "12:00:00") {
                            var fiveDayImg = $("<img>");

                            var fiveDayDate = $("<h3>");

                            var cityDayFor = $("<h3>");

                            var iconurl = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";


                            fiveDayImg.attr("src", iconurl);

                            fiveDayImg.attr("id", "five-day-forecast");

                            fiveDayDate.text("Date:" + dayArray[0]);

                            cityDayFor.attr("id", "five-day-forecast");

                            // Temperatr: 72
                            // wind: djdj

                            //iveDayDate.text(new Date(response.list[i]);

                            //  $("#five-day-forecast").text(response.list[i].main.temp);

                            $("#five-day-forecast").append("Temp:" + response.list[i].main.temp);

                            $("#five-day-forecast").append(fiveDayImg);

                            $("#five-day-forecast").append(fiveDayDate);

                        }

                    }
                    console.log(response.list);

                })


            }
            fiveDayWeather();
        })

    };

})
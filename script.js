$(document).ready(function () {

    var apikey = "fe0f799b6721a0dd5bd4752f1b8feb31";

    var city = [];

    var cityArr = JSON.parse(localStorage.getItem("Cities"));

    if (!cityArr) {

        cityArr = []
    }
    displayBtns();

    var cityIndex = "";

    var today = new Date();

    var fiveDay = "";

    var fiveMonth = "";

    var fiveYear = "";

    var date = {

        day: today.getDate(),

        month: (today.getMonth() + 1),

        year: today.getUTCFullYear()
    }
 
    var todayDate = date.month + "/" + date.day + "/" + date.year;

    var searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", todayWeather);

    function displayBtns() {

       $("#button-container").empty();

        for (i = 0; i < cityArr.length; i++) {

            var cityBtn = $("<button>");

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

        $(".city-buttons").on("click", function () {

            city = $(this).attr("date-name");

            todayWeather();

            fiveDayWeather();
        })
    }
    function todayWeather(event) {

        event.preventDefault();

        var city = $("#city").val().trim();

        $("#today-head-container").empty();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=imperial"

        $.ajax({

            url: queryURL,

            method: "GET"

        }).then(function (response) {

            console.log(response);

            if (cityArr.indexOf(city) === -1) {

                cityArr.push(city);

                localStorage.setItem("Cities", JSON.stringify(cityArr));
            }
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

            $("#uv").css("color,red");

            $("#today-head-container").append(cityDate);

            $("#today-head-container").append(img);

            fiveDayWeather()

        });
    }

    function fiveDayWeather() {

        var city = $("#city").val().trim();

        
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apikey + "&units=imperial";

        console.log(queryURL);

        $.ajax({

            url: queryURL,

            method: "GET",

        }).then(function (response) {

            console.log(response);

            $("#five-day-forecast").empty();

            $("h4").text("5-day Forecast");


            $("#five-day-forecast").addClass("row");

            for (i = 0; i < response.list.length; i++) {

                var timeDate = response.list[i].dt_txt;

                var trimTime = timeDate.slice(11, 13);

                var timeZone = (response.city.timeZone) / 3600;

                var timeZoneNoon = Math.ceil(timeZoneNoon / 3.0) * 3;

                // timeZoneNoon = timeDate.split(" ")[1] 

                console.log(trimTime);

                if (parseInt(trimTime) === 12) {

                    var newCard = $("<div>");

                    var fiveDayDate = $("<h6>");

                    var fiveDayImg = $("<img>");

                    var fiveDayTemp = $("<p>");

                    var fiveDayHum = $("<p>");

                    var tempF = (response.list[i].main.temp);

                    var forecast = response.list[i].weather[0].icon

                    var forecastIcon = "http://openweathermap.org/img/wn/" + forecast + ".png";

                    console.log(forecastIcon);

                    fiveDay = timeDate.slice(8, 10);

                    fiveMonth = timeDate.slice(5, 7);

                    ficeYear = timeDate.slice(0, 4);

                    if (fiveMonth.charAt(0) == 0) {

                        fiveMonth = fiveMonth.substring(1);
                    }
                    if (fiveDay.charAt(0) == 0) {

                        fiveDay = fiveDay.substring(1);
                    }
                    newCard.addClass("card text-white bg-success");

                    fiveDayDate.addClass("card-title");

                    fiveDayDate.addClass("card-img");

                    fiveDayTemp.addClass("card-text");

                    fiveDayHum.addClass("card-text");

                    fiveDayDate.text(fiveMonth + "/" + fiveDay + "/" + fiveYear);

                    fiveDayImg.attr("src", forecastIcon);

                    fiveDayTemp.text("Temp:" + tempF + "\xB0F");

                    fiveDayHum.text("Humidity:" + response.list[i].main.humidity + "%");


                    newCard.append(fiveDayDate);

                    newCard.append(fiveDayImg);

                    newCard.append(fiveDayTemp);

                    newCard.append(fiveDayHum);

                    $("#five-day-forecast").append(newCard);


                }


            }

        })
    }

    if (cityArr == null) {

        cittyArry = [];

    }
    else {
        displayBtns();
    }





    $("#button-container").on("click", function (event) {

        if (event.target.matches("button")) {

            city = event.target.dataset.name;

            todayWeather();
            
            fiveDayWeather();
        }
        else if (event.target.matches("i")) {

            event.target.closest("button").remove();

            cityIndex = cittyArr.indexOf(event.target.dataset.name);

            cityArr.splice(cityIndex, 1);
            
            localStorage.setItem("Cities", JSON.stringify(cityArr));

        }
    })

    $("#button-clear").on("click", function () {

        localStorage.clear();

        $("#button-container").empty();

        location.reload();

    })

    $(".fa-times").on("click", function (event) {

        event.stopPropagation();

        $(this).closest("button").remove();

        cityIndex = cityArr.indexOf($(this).attr("data-name"));

        cityArr.splice(cityIndex, 1);

        localStorage.setItem("Cities", JSON.stringify(cityArr));


    })



})


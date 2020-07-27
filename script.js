var apikey ="fe0f799b6721a0dd5bd4752f1b8feb31";
var cities=[];
var button = document.getElementById("button");

button.addEventListener("click", displayWeather);

function displayWeather() {
    var city = $("#city").val().trim();
// first ajax call to get city data
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=imperial"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
       console.log(response);
      
           var img = $("<img>")
           var iconurl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
           img.attr("src",iconurl)
           $("#weather-display").append(img);
        $(".name").text(response.name);
        $(".date").text(new Date(response.dt*1000).toLocaleDateString())
        queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+response.coord.lat+"&lon=" + response.coord.lon + "&appid=" + apikey + "&units=imperial"

// second call to get coord
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
           console.log(response);

            var iconurl = "http://openweathermap.org/img/w/" + response.weather.main.humudity.icon + ".png";
            img.attr("src",iconur)
            $("#weather-display").append(img);
            $(".main").text(response.humudity);
            
            queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?humudity="+ response.main.humudity + "&appid=" + apikey 
        })
   
    }
    )};
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
        queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?" + response.city + "&appid=" + apikey + "&units=imperial"

// second call to get coord

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response1){
           console.log(response1);

            iconurl1 = "http://openweathermap.org/img/w/" + response1.main[0] + ".png";
            img.attr("src",iconurl1)
            $("#weather-display").append(img);
            $(".main").text(response1.main);
          
            
            queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?"+ "feels like" + response1.main[0] + "&appid=" + apikey 
        })
   
    }
    )}
let APIkey = "08d83a26a547b974c4657af18b49c038";
$( document ).ready(function() {
    loadCity();
    // cick for new search
    $(".search").on("click",function(event){
        event.preventDefault();
        searchCity(event);
    })
    
    // execute search on city
    function searchCity(event){
        let loc = $("#newSearchLoc").val().trim();
        let units = "imperial";
        queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${APIkey}&units=${units}`;
        storeCity(loc);

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function(response){
                //console.log(response);
                $("#searchError").text("");
                let weatherData = response;
                postCurrentToPage(weatherData);
                
                // then use lat long to get UV data
                $.ajax({
                    url: `http://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}`,
                    method: "GET"
                }).then(function(response) {
                    //console.log(response);
                    $("#curUV").text(`UV Index: ${response.value}`);
                })
            },
            error: function(thrownError){
                $("#searchError").text("invalid search");
            }
            }).then(function(response) {
        });
    };

    // post the current weathre data to the page
    function postCurrentToPage(weatherData){
        // current date/loc
        let iconType = weatherData.weather[0].icon;
        weatherIcon = `http://openweathermap.org/img/wn/${iconType}.png`; //@2x
        currentStats = `${weatherData.name},  ${moment().format('MMMM Do, YYYY')}`;
        $("#currentStats").text(currentStats);
        $("#curWeatherImg").attr("src",weatherIcon);

        // current weather
        $("#curTemp").text(`Temperature: ${weatherData.main.temp}°F`);
        $("#curHum").text(`Humidity: ${weatherData.main.humidity}%`);
        $("#curWindSpeed").text(`Wind Speed: ${weatherData.wind.speed}mph`);
        return;
    }

    $("#previousSearches").on("click",function(event){

    })
    

    //store the searched city so it comes up next time someone loads the page
    function storeCity(cityName){
        localStorage.setItem("prevCity",cityName);
        let prevCities = JSON.parse(localStorage.getItem("prevCities"));
        if (!prevCities){
            prevCities = [cityName];
        }
        updatePageCities(prevCities, cityName)
    }

    function updatePageCities(prevCities, cityName){
        // update storage
        if (prevCities.length > 4){
            for (i = prevCities.length; i > 0; i--){
                prevCities[i] = prevCities[i-1];
            }
            prevCities[0] = cityName;
        }
        else{
            prevCities.splice(0, 0, cityName);
        }
        localStorage.setItem("prevCities",JSON.stringify(prevCities));

        //set city name history html
        prevCities = JSON.parse(localStorage.getItem("prevCities"));
        let htmlCityNames = $("#previousSearches").children()
        for (i=0; i < prevCities.length; i++){
            $(htmlCityNames[i]).text(prevCities[i]);
        }
    }

    //on page load, load the previous city's data
    function loadCity(){
        let prevCity = localStorage.getItem("prevCity");
        if (prevCity){
            $("#newSearchLoc").val(prevCity);
            searchCity(prevCity);
        }
    }

    // on clicking city in search history, load that city's data
    $(".search-hist").on("click",function(event){
        event.preventDefault();
        $("#newSearchLoc").val($(event.target).text());
        searchCity(event);
    })
});


let APIkey = "08d83a26a547b974c4657af18b49c038";
$( document ).ready(function() {
    
    // cick for new search
    $(".search").on("click",function(event){
        let loc = $("#newSearchLoc").val();
        queryURL = `api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${APIkey}`;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            let weatherData = response;
            postCurrentToPage(weatherData);
        });

    })
    
    function postCurrentToPage(){
        return;
    }

    $("#previousSearches").on("click",function(event){

    })
});


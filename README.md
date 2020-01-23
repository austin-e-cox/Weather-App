# Weather-App
Displays current weather and 5-day forecast for the city of your choosing

## Functionality
The tool utilizes AJAX and the OpenWeather API to pull and display weather data for the city of your choosing.
The page has a search box on the left panel where you input the city whose weather you want to view.
On pulling the weather for that city, the city is added to a history panel below. The city can only be displayed in that panel one time, and the panel will automatically rearrange to display your most recent search at the top. The user also has the ability to click any city in the history panel to execute an immediate search for the weather of that city.

Once searched, the current weather including temperature, wind speed, humidity and UV index are displayed, as well as the 5 day forecast of temperature and humidity.

The code utilizes local storage such that when the user reloads the page, the weather data is populated with the last city searched.

## Access
Repo: https://github.com/austin-e-cox/Weather-App

Active page: https://austin-e-cox.github.io/Weather-App/

![Page preview](/forecast_preview.png?raw=true "Page Preview")

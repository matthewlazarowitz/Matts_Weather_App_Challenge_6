$(function () {
    var apiKey = "ae5b0dcead613ff683cbd248a8ae7a91";
    var searchForm = $("#search-form");
    var cityInput = $("#city-input");
    var currentWeather = $("#current-weather");
    var forecast = $("#forecast");
    var searchHistory = $("#search-history");

    searchForm.on("submit", function (event) {
        event.preventDefault();
        var city = cityInput.val().trim();
        if (city === "") return;

        currentWeather.empty();
        forecast.empty();

        getCurrentWeather(city);
        getForecast(city);

        cityInput.val("");

        addCityToSearchHistory(city);
    });

    function getCurrentWeather(city) {
        var currentWeatherURL =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            apiKey +
            "&units=imperial";

        $.ajax({
            url: currentWeatherURL,
            method: "GET",
        }).then(function (response) {

            var cityName = response.name;
            var date = new Date(response.dt * 1000);
            var icon = response.weather[0].icon;
            var temperature = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;


            var currentWeatherContent =
                "<h2>" +
                cityName +
                "</h2>" +
                "<p>Date: " +
                date.toLocaleDateString() +
                "</p>" +
                "<img src='https://openweathermap.org/img/w/" +
                icon +
                ".png' alt='Weather Icon'>" +
                "<p>Temperature: " +
                temperature +
                " &#8457;</p>" +
                "<p>Humidity: " +
                humidity +
                "%</p>" +
                "<p>Wind Speed: " +
                windSpeed +
                " mph</p>";


            currentWeather.html(currentWeatherContent);
        });
    }

    function getForecast(city) {
        var forecastURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&appid=" +
            apiKey +
            "&units=imperial";

        $.ajax({
            url: forecastURL,
            method: "GET",
        }).then(function (response) {

            var forecastData = response.list;

            for (var i = 0; i < forecastData.length; i += 8) {
                var forecastItem = forecastData[i];
                var date = new Date(forecastItem.dt * 1000);
                var icon = forecastItem.weather[0].icon;
                var temperature = forecastItem.main.temp;
                var humidity = forecastItem.main.humidity;
                var windSpeed = forecastItem.wind.speed;

                var forecastContent =
                    "<div class='forecast-item'>" +
                    "<h3>" +
                    date.toLocaleDateString() +
                    "</h3>" +
                    "<img src='https://openweathermap.org/img/w/" +
                    icon +
                    ".png' alt='Weather Icon'>" +
                    "<p>Temperature: " +
                    temperature +
                    " &#8457;</p>" +
                    "<p>Humidity: " +
                    humidity +
                    "%</p>" +
                    "<p>Wind Speed: " +
                    windSpeed +
                    " mph</p>" +
                    "</div>";

                forecast.append(forecastContent);
            }
        });
    }

    function addCityToSearchHistory(city) {
        var searchHistoryItem =
            "<button class='search-history-item'>" +
            city +
            "</button>";

        searchHistory.append(searchHistoryItem);

        $(".search-history-item").last().on("click", function () {
            currentWeather.empty();
            forecast.empty();

            getCurrentWeather(city);
            getForecast(city);
        });
    }
});
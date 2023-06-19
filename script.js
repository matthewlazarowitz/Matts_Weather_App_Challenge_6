$(function () {
    var apiKey = "ae5b0dcead613ff683cbd248a8ae7a91";
    var searchForm = $("#search-form");
    var cityInput = $("#city-input");
    var currentWeather = $("#current-weather");
    var forecast = $("#forecast");
    var searchHistory = $("#search-history-buttons");

    searchForm.on("submit", function (event) {
        event.preventDefault();
        var city = cityInput.val().trim();
        if (city === "") return;

    });
});
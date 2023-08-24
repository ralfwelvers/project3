// Welcome！
console.log("Welcome to Team Error Slayers's Project 3!");
console.log("This is the current weather part --- interface by Jiahui!");

// Set up variables
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const windsElement = document.querySelector(".temperature-windspeed p");
const humidElement = document.querySelector(".temperature-humidity p");
const locationElement = document.querySelector(".location p");

// To receive all the weather data
const weather = {};
// Set up weather unit
const Kelvin = 273;
weather.temperature = {unit : "celsius"};

// OpenWeatherMap API Key
const API_KEY = "6d370cba458bd25e754a65c035a16594";

// Save config information
let url = "http://api.openweathermap.org/data/2.5/weather?";

// Function to set up location
// Take Chicago as an example
function setPosition(){
    let latitude = 41.8781;
    let longitude = -87.6298;
    
    // Call getWeather function to 
    getWeather(latitude, longitude);
}

// Function to get weather information based on the API call
function getWeather(latitude, longitude){
    let API_call = `${url}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    
    fetch(API_call)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.windspeed = data.wind.speed;
            weather.humidity = data.main.humidity;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// Function to display weather information
function displayWeather(){
    locationElement.innerHTML = `${weather.city}`;
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    windsElement.innerHTML = `Wind Speed: ${weather.windspeed} m/s`;
    humidElement.innerHTML = `Humidity: ${weather.humidity}%`;
}

// Function to convert celsius to fahrenheit
function cToF(temperature){
    return (temperature * 9/5) + 32;
}

// Function to convert temperature unit when the user click on the temperature element
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = cToF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

// Start the project here!
setPosition();
console.log("The project starts running now!");

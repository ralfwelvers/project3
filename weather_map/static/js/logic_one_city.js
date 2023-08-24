// Welcome
console.log("Welcome to Team Error Slayers's Project 3!");
console.log("This is the current weather part by Jiahui!");

// OpenWeatherMap API Key
let weather_api_key = "6d370cba458bd25e754a65c035a16594";

// Save config information
let url = "http://api.openweathermap.org/data/2.5/weather?";

// Build partial query URL
// This time only for Chicago's weather information
let lat = 41.8781;
let lon = -87.6298;
let query_url = url + "appid=" + weather_api_key + "&units=imperial" + "&lat=" + lat + "&lon=" + lon;

// Perform an API call to receive the current weather data
// Call createMarkers when it completes
d3.json(query_url).then(createMarkers);

// Function to design the markers
function createMarkers(weather_data) {

    // Display all the data
    console.log(weather_data);

    // Finish reading all the data
    console.log("This is all the data from the query_url!");
    console.log("The city shown is:" + weather_data.name);

    // Initialize an array to hold bike markers.
    let weatherMarkers = [];
  
    // For each city, create a marker, and bind a popup with weather description, temperature, and rain of each city.
    let weatherMarker = L.circle([weather_data.coord["lat"], weather_data.coord["lon"]],{
        radius: weather_data.main.temp*5,
        fillColor: colorsDesign(weather_data.main.temp),
        fillOpacity: 0.7,
        weight: 0.5
    }).bindPopup("<h3>Name: " + weather_data.name + 
        "<h3><h3>Temperature: " + weather_data.main.temp + "°F" + 
        "</h3><h3>Wind Speed: " + weather_data.wind.speed + 
        "</h3><h3>Humidity: " + weather_data.main.humidity + "</h3>"
    );

    // Add the marker to weatherMarkers array.
    weatherMarkers.push(weatherMarker);
  
    // Successfully build markers
    console.log("All Markers have been built!");

    // Create a layer group that's made from the weather markers array, and pass it to the createMap function.
    createMap(L.layerGroup(weatherMarkers));
}

// Function to determine the color of markers based on the magnitude of temperature
function colorsDesign(temp) {

    // variable to hold the color
    let color = "";

    if (temp <= 32 && temp >= 0) {
        return color = "#fef0d9";
    }
    else if (temp <= 59) {
        return color = "#fdd49e";
    }
    else if (temp <= 77) {
        return color = "#fdbb84";
    }
    else if (temp <= 95) {
        return color = "#fc8d59";
    }
    else if (temp <= 104) {
        return color = "#e34a33";
    }
    else {
        return color = "#b30000";
    }

};

// Function to set up the map layers
function createMap(weather_datas) {
    
    // Create Tile Layers
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps to hold street map layer
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create a OverlayMaps to hold the earthquakes data layer
    let overlayMaps = {
        "Weather": weather_datas
    };

   // Create the map object with options
    let myMap = L.map("map", {
        center: [41.8781, -87.6298],
        zoom: 12,
        layers: [streetmap, weather_datas]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Create a legend to display information about our map
    var info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML=[
            "<p class='l1'>0 - 32</p>",
            "<p class='l2'>32 - 59</p>",
            "<p class='l3'>59 - 77</p>",
            "<p class='l4'>77 - 95</p>",
            "<p class='l5'>95 - 104</p>",
            "<p class='g5'>>=104</p>"
        ].join("");

        return div;
    };
    
    // Add the info legend to the map
    info.addTo(myMap);
}



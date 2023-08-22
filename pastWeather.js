let queryUrl = "https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}&start_date={start_date}&end_date={end_date}&hourly=temperature_2m&daily=temperature_2m_mean&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=auto";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.value;
    if (selectedCity == "Chicago, IL"){
    var lat = 41.875;
    var lon = -87.625;
    }else if (selectedCity == "Denton, TX"){
    var lat = 40.7128;
    var lon = -74.0060;
    }else if (selectedCity == "San Antonio, TX"){
      var lat = 29.4242;
      var lon = -98.4936;
    }
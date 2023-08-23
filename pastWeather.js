
const baseUrl = "https://archive-api.open-meteo.com/v1/archive";
//https://archive-api.open-meteo.com/v1/archive?latitude=52.5211&longitude=13.41111&start_date=2023-08-03&end_date=2023-08-17&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FChicago
//https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2023-08-03&end_date=2023-08-17&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FChicago
//https://archive-api.open-meteo.com/v1/archive?latitude=41.87&longitude=-87.623177&start_date=2020-01-01&end_date=2020-06-30&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FChicago
const citySelect = document.getElementById('citySelect');
const selectedCity = citySelect.value;
let lat, lon; 

if (selectedCity == "Chicago, IL"){
  lat = 41.875;
  lon = -87.625;
}else if (selectedCity == "Denton, TX"){
  lat = 40.7128;
  lon = -74.0060;
}else if (selectedCity == "San Antonio, TX"){
  lat = 29.4242;
  lon = -98.4936;
}

const start_date = "2020-01-01";
const end_date = "2020-06-30";
//////////////////////https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2023-08-04&end_date=2023-08-18&daily=temperature_2m_mean&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago

const pastWeatherUrl = `${baseUrl}?latitude=${selectedCity.split(',')[0]}&longitude=${selectedCity.split(',')[1]}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_mean&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;
console.log(pastWeatherUrl);

let metric; 

d3.json(pastWeatherUrl).then(function(earthquakeData) {
  metric = earthquakeData.daily_units.temperature_2m_mean;
  createFeatures(earthquakeData);
});

const weatherDataDiv = document.getElementById('weatherData');
weatherDataDiv.innerHTML = "";
function createFeatures(earthquakeData) {
  let time = earthquakeData.daily.temperature_2m_mean;
  let frame = time.length; 
  console.log(frame);
  let counter = 0;
  const weatherDataDiv = document.getElementById('weatherData');

  for(var i = 0; i < frame; i++){
  let date = earthquakeData.daily.time[i];
  let temp = earthquakeData.daily.temperature_2m_mean[i];
  const weatherEntry = `
  <p>Date: ${date} CST</p>
  <p>Temp: ${temp} ${metric}</p>`;

  weatherDataDiv.innerHTML += weatherEntry;
  }
};

const baseUrl = "https://archive-api.open-meteo.com/v1/archive";

const citySelect = document.getElementById('citySelect');
const selectedCity = citySelect.value;
let lat, lon; 
let metric;

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

//show last two weeks from todays date for the selected city

const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
//const submitButton = document.getElementById('submit');
const today = new Date();
const start_date = new Date();

start_date.setDate(start_date.getDate() - 300);
today.setDate(today.getDate() - 1);
const maxDate = today.toISOString().split('T')[0];
startDateInput.max = maxDate;
endDateInput.max = today.setDate(today.getDate() - 1);
//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=XVLF42ATVWX4DP9DKQT4DM9PW
//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-08-01/2020-08-25?key=XVLF42ATVWX4DP9DKQT4DM9PW
let startDate = start_date.toISOString().split('T')[0];
  let endDate = today.toISOString().split('T')[0];
  console.log("Start Date:" + startDate);
  console.log("End Date: " + endDate);
  const pastWeatherUrl2 = https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-08-01/2020-08-25?key=XVLF42ATVWX4DP9DKQT4DM9PW
  const pastWeatherUrl = `${baseUrl}?latitude=${selectedCity.split(',')[0]}&longitude=${selectedCity.split(',')[1]}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;
  console.log(pastWeatherUrl);
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
  const weatherDataDiv = document.getElementById('weatherData');
  const weatherCardContainer = document.createElement('div');
  weatherCardContainer.classList.add('weather-card-container');


const chartData = {
  labels: [],
  series: [[]]
};
for (let i = 0; i < frame; i++){
  let date = earthquakeData.daily.time[i];
  let temp = earthquakeData.daily.temperature_2m_mean[i];
  let formattedDate = '${date.getMonth()+1}/${date.getDate()}';
  chartData.labels.push(date);
  chartData.series[0].push(temp);
}

const chartOptions = {
  fullWidth: true, 
  chartPadding: {
    right: 40
  },
  axisX: {
    labelInterpolationFnc: function(value, index) {
      return index % 2 === 0? value : null;
    }
  },
  axisY: {
    onlyIntegers: true
  }
}

new Chartist.Line('#chartContainer', chartData, chartOptions);

  // for(var i = 0; i < frame; i++){
  // let date = earthquakeData.daily.time[i];
  // let temp = earthquakeData.daily.temperature_2m_mean[i];
  // const weatherEntry = `
  // <div class="weather-card">
  //   <div class="weather-card-header">
  //     <p>Date: ${date} CST</p>
  //   </div>
  //   <div class="weather-card-content">
  //     <p>Temperature: ${temp} F</p>
  //   </div>
  // </div>`;
  // const weatherCard = document.createElement('div');
  // weatherCard.innerHTML = weatherEntry;
  // weatherCardContainer.appendChild(weatherCard);
  // }
  weatherDataDiv.appendChild(weatherCardContainer);
};
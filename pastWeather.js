let citySelect = document.getElementById('citySelect');
let selectedCity = citySelect.value;
let lat, lon; 

//copy paste line 19 to 32 allong with createFeatures function
const today = new Date();
const start_date = new Date(today);

// Set end_date to yesterday's date
const end_date = new Date(today);

//A substraction by two brings yesterday's date
end_date.setDate(today.getDate() - 1);

// Set start_date to 14 days before yesterday's date
start_date.setDate(end_date.getDate()-14);

let startDate = start_date.toISOString().split('T')[0];
let endDate = end_date.toISOString().split('T')[0];

// console.log("Start Date: " + startDate);
// console.log("End Date: " + endDate);
console.log(selectedCity);

citySelect.addEventListener('change', function() {
  selectedCity = citySelect.value;  // Update selectedCity when dropdown changes
  console.log(`Selected city: ${selectedCity}`);
  let pastWeatherUrl2 = `https://api.weatherbit.io/v2.0/history/daily?key=60a45320427d4321804f21050ab89b72&city=${selectedCity}&start_date=${startDate}&end_date=${endDate}&units=I`;
  d3.json(pastWeatherUrl2).then(function(earthquakeData) {
    createFeatures(earthquakeData);
});
// if (selectedCity == "Chicago, IL"){
//   lat = 41.875;
//   lon = -87.625;
// }else if (selectedCity == "Denton, TX"){
//   lat = 40.7128;
//   lon = -74.0060;
// }else if (selectedCity == "San Antonio, TX"){
//   lat = 29.4242;
//   lon = -98.4936;
// }
// lat = 41.875;
// lon = -87.625;

//put api key in config file
//const pastWeatherUrl2 = `https://api.weatherbit.io/v2.0/history/daily?key=60a45320427d4321804f21050ab89b72&lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&units=I`;
console.log(pastWeatherUrl2);

});

//copy paste function to view3 section then in the index.html place this: <div id="chartContainer" class="chart-container"></div>

function createFeatures(earthquakeData) {
//  console.log(earthquakeData);
  let frame = earthquakeData.data.length; 
  const chartData = {
    labels: [],
    series: [[]]
  };
  for (let i = 0; i < frame; i++){
    let date = earthquakeData.data[i].datetime;
    let temp = earthquakeData.data[i].temp;
    chartData.labels.push(formatDate(date));
    chartData.series[0].push(temp);
  }

  function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  return new Date(dateString).toLocaleDateString(undefined, options);
  }

var formatStart = formatDate(startDate);
var formatEnd = formatDate(endDate);
// console.log(formatStart);
// console.log(formatEnd);

//The creation of line chart with apex chart js library
var options = {
  series: [{
  name: 'Min Temp (°F)',
  data: chartData.series[0]
}],
  chart: {
  type: 'area',
  stacked: false,
  height: 350,
  zoom: {
    type: 'x',
    enabled: true,
    autoScaleYaxis: true
  },
  toolbar: {
    autoSelected: 'zoom'
  }
},
dataLabels: {
  enabled: false
},
markers: {
  size: 0,
},
title: {
  text: `Past Weather from ${formatStart} to ${formatEnd}`,
  align: 'left'
},
fill: {
  type: 'gradient',
  gradient: {
    shadeIntensity: 1,
    inverseColors: false,
    opacityFrom: 0.5,
    opacityTo: 0,
    stops: [0, 90, 100]
  },
},
// yaxis: {
//   labels: {
//     formatter: function (val) {
//       return (val / 1000000).toFixed(0);
//     },
//   },
//   title: {
//     text: 'Price'
//   },
// },
xaxis: {
  categories: chartData.labels
},
// tooltip: {
//   shared: false,
//   y: {
//     formatter: function (val) {
//       return (val / 1000000).toFixed(0)
//     }
//   }
// }
};

var chart = new ApexCharts(document.querySelector("#chartContainer"), options);
chart.render();
};




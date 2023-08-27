//DUE TO API LIMIT FUNCTION createFetures is ignored until 08/27 1pm

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

const today = new Date();
const start_date = new Date();

// Set end_date to yesterday's date
const end_date = new Date(today);

//A substraction by two brings yesterday's voice
end_date.setDate(today.getDate() - 2);

// Set start_date to 14 days before yesterday's date
start_date.setDate(end_date.getDate()-14);

let startDate = start_date.toISOString().split('T')[0];
let endDate = end_date.toISOString().split('T')[0];

console.log("Start Date: " + startDate);
console.log("End Date: " + endDate);


//put api key in config file
const pastWeatherUrl2 = `https://api.weatherbit.io/v2.0/history/daily?key=f5ef981c4d594b8b8be7501dc7da2fde&lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&units=I`;
console.log(pastWeatherUrl2);
//IGNOURE LINES 33-186
// d3.json(pastWeatherUrl2).then(function(earthquakeData) {
//   createFeatures(earthquakeData);
// });
//createFeatures(earthquakeData);
function createFeatures(earthquakeData) {
  console.log(earthquakeData);
  //frame = time frame
//   let frame = earthquakeData.data.length; 
//   console.log(frame);

// const chartData = {
//   labels: [],
//   series: [[]]
// };
// for (let i = 0; i < frame; i++){
//   let date = earthquakeData.data[i].datetime;
//   let temp = earthquakeData.data[i].min_temp;
//   chartData.labels.push(date);
//   chartData.series[0].push(temp);
// }
//console.log(chartData);
let leTemp = ['32','54','65','32','66','77','89','33','76','88','43','54','54'];
let leDate = [
  "2023-08-01",
  "2023-08-02",
  "2023-08-03",
  "2023-08-04",
  "2023-08-05",
  "2023-08-06",
  "2023-08-07",
  "2023-08-08",
  "2023-08-09",
  "2023-08-10",
  "2023-08-11",
  "2023-08-12",
  "2023-08-13"
];
console.log(leTemp);
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to convert "YYYY-MM-DD" to "Month Name Day, Year" format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Convert each date and store in a new array
const formattedDates = dateList.map(date => formatDate(leDate));

// Print the formatted dates
console.log(formattedDates);

var options = {
  series: [{
  name: `Daily`,
  data: leTemp
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
// dataLabels: {
//   enabled: false
// },
// markers: {
//   size: 0,
// },
title: {
  text: `Daily Temperatures from ${startDate} to ${endDate}`,
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
  categories: leDate
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

// var chart = new ApexCharts(document.querySelector("#chartContainer"), options);
// chart.render();

var options = {
  chart: {
    type: 'line'
  },
  series: [{
    name: 'Min Temp',
    data: leTemp
  }],
  xaxis: {
    categories: leDate
  }
}

var chart = new ApexCharts(document.querySelector("#chartContainer"), options);

chart.render();
// const chartOptions = {
//   fullWidth: true, 
//   chartPadding: {
//     right: 40
//   },
//   axisX: {
//     labelInterpolationFnc: function(value, index) {
//       return index % 2 === 0? value : null;
//     }
//   },
//   axisY: {
//     onlyIntegers: true
//   }
// }

// new Chartist.Line('#chartContainer', chartData, chartOptions);
};

//TEMPORARY DATA SINCE LIMIT ON API (USED FOR TESTING)
let leTemp = ['32','54','65','32','66','77','89','33','76','88','43','54','54'];
let leDate = [
  "2023-08-01",
  "2023-08-02",
  "2023-08-03",
  "2023-08-04",
  "2023-08-05",
  "2023-08-06",
  "2023-08-07",
  "2023-08-08",
  "2023-08-09",
  "2023-08-10",
  "2023-08-11",
  "2023-08-12",
  "2023-08-13"
];

//YYYY-MM-DD TO Month name day, year format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const formattedDates = leDate.map(date => formatDate(date));
console.log(formattedDates);

var formatStart = formatDate(startDate);
var formatEnd = formatDate(endDate);
console.log(formatStart);
console.log(formatEnd);

//The creation of line chart with apex chart js library
var options = {
  series: [{
  name: 'Min Temp (°F)',
  data: leTemp
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
  categories: formattedDates
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



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

//show last two weeks from todays date for the selected city
start_date.setDate(start_date.getDate() - 14);
today.setDate(today.getDate() - 1);

let startDate = start_date.toISOString().split('T')[0];
  let endDate = today.toISOString().split('T')[0];
  console.log("Start Date:" + startDate);
  console.log("End Date: " + endDate);
  let myCity = "Chicago,IL"
  //put api key in config file
  const pastWeatherUrl2 = `https://api.weatherbit.io/v2.0/history/daily?key=f5ef981c4d594b8b8be7501dc7da2fde&lat=29.4242&lon=-98.4936&start_date=${startDate}&end_date=${endDate}&units=I`;

  console.log(pastWeatherUrl2);
  d3.json(pastWeatherUrl2).then(function(earthquakeData) {
    createFeatures(earthquakeData);
  });

function createFeatures(earthquakeData) {
  console.log(earthquakeData);
  let frame = earthquakeData.data.length; 
  console.log(frame);

const chartData = {
  labels: [],
  series: [[]]
};
for (let i = 0; i < frame; i++){
  let date = earthquakeData.data[i].datetime;
  let temp = earthquakeData.data[i].min_temp;
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
};
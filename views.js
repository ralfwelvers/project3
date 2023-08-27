async function fetchData() {
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.value;
    
    const dropdown = document.getElementById("citySelect");
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const selectedText = selectedOption.text;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.split(',')[0]}&lon=${selectedCity.split(',')[1]}&exclude=hourly,daily&appid=6d370cba458bd25e754a65c035a16594`;
    
    const aqiUrl = `https://api.waqi.info/feed/geo:${selectedCity.split(',')[0]};${selectedCity.split(',')[1]}/?token=5997f32b1e4901f26a6916f1fe531bace85a4816`;
    
    try {
      //view 1 start
      
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

      let latitude = selectedCity.split(',')[0];
      let longitude = selectedCity.split(',')[1];

      getWeather(latitude, longitude);

      // Function to get weather information based on the API call
      function getWeather(latitude, longitude){
          let API_call = `${url}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
          
          fetch(API_call)
              .then(function(response){
                  let data = response.json();
                  return data;
              })
              .then(function(data){
                  weather.temperature.value = (Math.floor(data.main.temp - Kelvin)*9/5)+32;
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
          locationElement.innerHTML = selectedText //`${weather.city}`;
          iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
          tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
          descElement.innerHTML = weather.description;
          windsElement.innerHTML = `Wind Speed: ${weather.windspeed} m/s`;
          humidElement.innerHTML = `Humidity: ${weather.humidity}%`;
      }

      // Function to convert fahrenheit to celsius
      function cToF(temperature){
          return (temperature - 32) * 5/9;
      }

      // Function to convert temperature unit when the user click on the temperature element
      tempElement.addEventListener("click", function(){
          if(weather.temperature.value === undefined) return;
          
          if(weather.temperature.unit == "fahrenheit"){
              let celsius = cToF(weather.temperature.value);
              celsius = Math.floor(celsius);
              
              tempElement.innerHTML = `${celsius}°<span>C</span>`;
              weather.temperature.unit = "celsius";
          }else{
              tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
              weather.temperature.unit = "fahrenheit"
          }
      });

      //view 1 end

      //view 2 start

      //var cityName = document.getElementById("cityName");
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.split(',')[0]}&lon=${selectedCity.split(',')[1]}&exclude=hourly,daily&appid=6d370cba458bd25e754a65c035a16594`;
 
      //fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=50a4b6e744a360715ece0a489e680b8b')
      fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
    
      //Getting the min and max values for each day
      for(i = 0; i<5; i++){
          document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number((data.list[i].main.temp_min - 273.15) * 9/5 +32).toFixed(1)+ "°F";
      }
    
      for(i = 0; i<5; i++){
          document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number((data.list[i].main.temp_max - 273.15)* 9/5 +32).toFixed(1) + "°F";
      }
      //------------------------------------------------------------
    
      //Getting Weather Icons
       for(i = 0; i<5; i++){
          document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
          data.list[i].weather[0].icon
          +".png";
      }
      //------------------------------------------------------------
    
      //*TEST: Weather descriptions
      for(i = 0; i<5; i++){
        document.getElementById("desc" + (i+1)).innerHTML =
        (data.list[i].weather[0].description).toUpperCase();
      }
      })


      //Getting and displaying the text for the upcoming five days of the week
      var d = new Date();
      var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

      //Function to get the correct integer for the index of the days array
      function CheckDay(day){
        if(day + d.getDay() > 6){
            return day + d.getDay() - 7;
        }
        else{
            return day + d.getDay();
        }
      }

        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i+1)];
        }
        //------------------------------------------------------------

      //view 2 end


      //view 3 start

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
      const pastWeatherUrl2 = `https://api.weatherbit.io/v2.0/history/daily?key=f5ef981c4d594b8b8be7501dc7da2fde&lat=${selectedCity.split(',')[0]}&lon=${selectedCity.split(',')[1]}&start_date=${startDate}&end_date=${endDate}&units=I`;
      
      d3.json(pastWeatherUrl2).then(function(earthquakeData) {
        createFeatures(earthquakeData);
      });
      console.log(pastWeatherUrl2);
      
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
      



      //view 3 end


      //view 4 start
      
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      const sunriseUTC = weatherData.sys.sunrise; // UNIX timestamp in seconds
      const sunsetUTC = weatherData.sys.sunset;   // UNIX timestamp in seconds
      
      const sunriseCST = new Date(sunriseUTC * 1000); // Convert to milliseconds
      const sunsetCST = new Date(sunsetUTC * 1000);   // Convert to milliseconds
      
      // Apply CST offset (UTC-6 hours)
      sunriseCST.setHours(sunriseCST.getHours());
      sunsetCST.setHours(sunsetCST.getHours());
      
      const aqiResponse = await fetch(aqiUrl);
      const aqiData = await aqiResponse.json();
      
      // Function to get AQI description based on ranges
      function getAqiDescription(aqiValue) {
        if (aqiValue <= 50) return 'Good';
        if (aqiValue <= 100) return 'Moderate';
        if (aqiValue <= 150) return 'Unhealthy for Sensitive Groups';
        if (aqiValue <= 200) return 'Unhealthy';
        if (aqiValue <= 300) return 'Very Unhealthy';
        return 'Hazardous';
      }

      const aqiValue = aqiData.data.aqi;
      const aqiDescription = getAqiDescription(aqiValue);

      // Add appropriate CSS class based on AQI value
      let aqiClass = 'aqi-hazardous';
      if (aqiValue <= 50) aqiClass = 'aqi-good';
      else if (aqiValue <= 100) aqiClass = 'aqi-moderate';
      else if (aqiValue <= 150) aqiClass = 'aqi-unhealthy-sensitive';
      else if (aqiValue <= 200) aqiClass = 'aqi-unhealthy';
      else if (aqiValue <= 300) aqiClass = 'aqi-very-unhealthy';

      // Display weather and AQI data on the webpage
      const weatherDataDiv = document.getElementById('weatherData');
      weatherDataDiv.innerHTML = `
        <p>Sunrise: ${sunriseCST.toLocaleTimeString()} CST</p>
        <p>Sunset: ${sunsetCST.toLocaleTimeString()} CST</p>
        <p>Air Quality Index: <span class="${aqiClass} aqi-description">${aqiValue} - ${aqiDescription}</span></p>
      `;

      //view 4 end

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Call the function to fetch and display data
fetchData();

// Attach event listener to city select dropdown
//const citySelect = document.getElementById('citySelect');
citySelect.addEventListener('change', fetchData);
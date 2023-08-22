async function fetchData() {
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.value;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.split(',')[0]}&lon=${selectedCity.split(',')[1]}&exclude=hourly,daily&appid=6d370cba458bd25e754a65c035a16594`;
    
    const aqiUrl = `https://api.waqi.info/feed/geo:${selectedCity.split(',')[0]};${selectedCity.split(',')[1]}/?token=5997f32b1e4901f26a6916f1fe531bace85a4816`;
    
    try {
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Call the function to fetch and display data
fetchData();

// Attach event listener to city select dropdown
const citySelect = document.getElementById('citySelect');
citySelect.addEventListener('change', fetchData);
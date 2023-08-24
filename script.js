// Function to populate the dropdown with cities
function populateDropdown(data) {
    const dropdown = document.getElementById('citySelect');

    data.forEach(city => {
      const option = document.createElement('option');
      option.value = `${city.latitude},${city.longitude}`;
      option.text = city.city_name;
      dropdown.appendChild(option);
    });

  }

  // Fetch data from the API
fetch('http://127.0.0.1:5000/api/cities')
.then(response => response.json())
.then(data => populateDropdown(data))

.catch(error => console.error('Error fetching data:', error));

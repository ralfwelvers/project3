# Project 3
## Team: Error Slayers
* Jiahui Yang
* Saber Garibi
* Rajan Patel
* Ralf Welvers

## Topic: Weather Information	

## Datasets:
* OpenWeather API: https://openweathermap.org/
* OpenMeteo API: https://open-meteo.com/
* Waqi API: https://waqi.info/
* City names and geolocations from https://simplemaps.com/data/us-cities

## Premise:
* Create a weather info dashboard
* Have a dropdown for specific cities
* Weather views will be shown:
  - Current Weather - Jiahui: https://openweathermap.org/current
  - Forecasted Weather - Rajan: https://open-meteo.com/
  - Past Weather - Saber: https://open-meteo.com/
  - Sunrise, Sunset, Current Air Quality - Ralf: https://openweathermap.org/, https://waqi.info/

Here are descriptions for all the files:

app.py: This is the API that provides the cities for the dropdown. If you want to try everything, you’ll need to run this first. Right-click on the file and select “Run Python File in Terminal.”

index.html: This is the main page.

view1-style.css: Contains some of the css styles.

view2-style.css: Contains some of the css styles.

view4-style.css: Contains some of the css styles.

script.js: This has the code which populates the dropdown.

views.js: This has the code which pulls the sunrise, sunset and air quality index.

create database.ipynb: This is the jupyter notebook that populates the default cities sqlite database that is used for demo purposes.

cities.db: Contains the city data for the dropdown for demo purposes.

create database all cities.ipynb: This is the jupyter notebook that populates the cities sqlite database that has over 30,000 cities in it.

cities-all.db: Contains the city data for the dropdown that contains over 30,000 cities.

uscities.csv: contains the city data for the database that contains over 30,000 cities.


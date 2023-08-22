import requests
from pprint import pprint
import json

from flask import Flask, jsonify

app = Flask(__name__)

DNLat = 33.2148
DNLon = -97.1331

ASLat = 29.4241
ASLon = -98.4936

CHLat = 41.85
CHLon = -87.65

start_date = "2023-07-30"
end_date = "2023-08-13"

meteo_api = "https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}&start_date={start_date}&end_date={end_date}&hourly=temperature_2m&daily=temperature_2m_mean&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=auto"

denton_url = meteo_api.format(lat=DNLat, lon=DNLon, start_date=start_date, end_date=end_date)
SA_url = meteo_api.format(lat=ASLat, lon=ASLon, start_date=start_date, end_date=end_date)
Chi_url = meteo_api.format(lat=CHLat, lon=CHLon, start_date=start_date, end_date=end_date)

response_denton = requests.get(denton_url)
response_SA = requests.get(SA_url)
response_Chi = requests.get(Chi_url)


@app.route('/get_api_data')
def get_api_data():
    myOption = requests.args.get('myOption')
    if myOption == 'Chicago, IL':
        return jsonify(response_Chi)
    elif myOption == 'San Antonio, TX':
        return jsonify(response_SA)
    elif myOption == 'Denton, IL':
        return jsonify(response_denton)
    else:
        return jsonify({'error': 'Invalid option'})
    
if __name__ == '__main__':
    app.run(debug=True)
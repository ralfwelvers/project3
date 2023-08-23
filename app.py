from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Database connection function
def get_db_connection():
    conn = sqlite3.connect('cities.db')
    conn.row_factory = sqlite3.Row  # To fetch rows as dictionaries
    return conn

# API route to fetch cities as JSON
@app.route('/api/cities', methods=['GET'])
def get_cities():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT city_name, longitude, latitude FROM cities')
        cities = cursor.fetchall()

        city_list = []
        for city in cities:
            city_list.append({
                'city_name': city['city_name'],
                'longitude': city['longitude'],
                'latitude': city['latitude']
            })

        conn.close()
        return jsonify(city_list)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

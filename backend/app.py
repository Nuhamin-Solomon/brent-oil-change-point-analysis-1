import os
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ==========================
# File paths
# ==========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

prices_csv = os.path.join(BASE_DIR, '../data/BrentOilPrices.csv')
events_csv = os.path.join(BASE_DIR, '../data/external_events.csv')
change_csv = os.path.join(BASE_DIR, '../data/change_points.csv')

# ==========================
# Load CSVs
# ==========================
prices_df = pd.read_csv(prices_csv)
prices_df['Date'] = pd.to_datetime(prices_df['Date'], errors='coerce')

events_df = pd.read_csv(events_csv)
events_df['Date'] = pd.to_datetime(events_df['Date'], errors='coerce')

try:
    change_df = pd.read_csv(change_csv)
    change_df['Date'] = pd.to_datetime(change_df['Date'], errors='coerce')
except FileNotFoundError:
    print("change_points.csv not found. Creating a placeholder file.")
    change_df = pd.DataFrame(columns=['Date', 'Change_Type', 'Description'])
    change_df.to_csv(change_csv, index=False)

# ==========================
# API Endpoints
# ==========================
@app.route('/api/prices', methods=['GET'])
def get_prices():
    return jsonify(prices_df.to_dict(orient='records'))

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events_df.to_dict(orient='records'))

@app.route('/api/change-points', methods=['GET'])
def get_change_points():
    return jsonify(change_df.to_dict(orient='records'))

@app.route('/')
def home():
    return "Brent Oil Dashboard API is running! Use /api/prices, /api/events, /api/change-points"

# ==========================
# Run Flask app
# ==========================
if __name__ == '__main__':
    app.run(debug=True)

// src/Dashboard.js
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [error, setError] = useState(null);

  // Fetch Prices
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/prices")
      .then((res) => res.json())
      .then((data) => setPrices(data))
      .catch((err) => {
        console.error("Error fetching prices:", err);
        setError("Failed to fetch prices");
      });
  }, []);

  // Fetch Events
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events");
      });
  }, []);

  // Fetch Change Points
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/change-points")
      .then((res) => res.json())
      .then((data) => setChangePoints(data))
      .catch((err) => {
        console.error("Error fetching change points:", err);
        setError("Failed to fetch change points");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Brent Oil Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Prices Chart</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={prices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" />
            {changePoints.map((cp, index) => (
              <ReferenceDot
                key={index}
                x={cp.Date}
                y={cp.Price}
                r={5}
                fill="red"
                stroke="none"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2>Events</h2>
      <ul>
        {events.length > 0 ? (
          events.map((event, index) => (
            <li key={index}>
              <strong>{event.Date}:</strong> {event.Event}
            </li>
          ))
        ) : (
          <li>No events available</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;

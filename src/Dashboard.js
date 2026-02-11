import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const Dashboard = () => {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);

  useEffect(() => {
    // Fetch Brent oil prices
    fetch("http://127.0.0.1:5000/api/prices")
      .then((res) => res.json())
      .then((data) => setPrices(data))
      .catch((err) => console.error("Error fetching prices:", err));

    // Fetch events
    fetch("http://127.0.0.1:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));

    // Fetch change points
    fetch("http://127.0.0.1:5000/api/change-points")
      .then((res) => res.json())
      .then((data) => setChangePoints(data))
      .catch((err) => console.error("Error fetching change points:", err));
  }, []);

  return (
    <div>
      <h1>Brent Oil Dashboard</h1>

      <h2>Oil Prices</h2>
      <LineChart width={900} height={400} data={prices}>
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="Price" stroke="#8884d8" />
      </LineChart>

      <h2>Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.Date}: {event.Event}
          </li>
        ))}
      </ul>

      <h2>Change Points</h2>
      <ul>
        {changePoints.map((cp, index) => (
          <li key={index}>
            {cp.Date}: Change detected
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

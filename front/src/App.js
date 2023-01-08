import React, { useEffect, useState } from "react";

import axios from "axios";

const possibleWaypoints = [
  { name: "Espoo", rating: 5 },
  { name: "Helsinki", rating: 4 },
  { name: "Vantaa", rating: 3 },
];

const App = () => {
  const [waypoints, setWaypoints] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/path/get").then((res) => {
      setWaypoints(res.data);
    });
  }, []);

  const generate = async () => {
    const randomWaypoint = () => {
      const randIndex = Math.floor(Math.random() * possibleWaypoints.length);
      const randomizedWaypoint = possibleWaypoints[randIndex];
      return randomizedWaypoint;
    };

    const randomPath = {
      name: "TEST",
      rating: 5,
    };

    const randomWaypoints = Array.from({ length: 2 }, randomWaypoint);

    const t = await axios.post(
      "http://localhost:3001/api/paths/insert",
      randomPath
    );
    const path = await Promise.all(
      randomWaypoints.map(async (waypoint) => {
        const b = await axios.post(
          "http://localhost:3001/api/waypoints/insert",
          {
            ...waypoint,
            pathID: t.data[0].pathID,
          }
        );
        return {
          ...waypoint,
          pathID: t.data[0].pathID,
          ID: b.data[0].ID,
        };
      })
    );
    setWaypoints(path);
  };
  return (
    <div>
      <h1>PathBuilder</h1>
      <button onClick={generate}>Generate path!</button>
      <h3>Waypoints</h3>
      {waypoints.map((waypoint) => (
        <p key={waypoint.ID}>
          {waypoint.name} of rating {waypoint.rating}
        </p>
      ))}
    </div>
  );
};

export default App;

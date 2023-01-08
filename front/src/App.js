import React, { useEffect, useState } from "react";

import axios from "axios";

const possibleWaypoints = [
  { name: "Leppävaara", rating: 5 },
  { name: "Tapiola", rating: 4 },
  { name: "Otaniemi", rating: 3 },
  { name: "Niittykumpu", rating: 3 },
  { name: "Matinkylä", rating: 2 },
  { name: "Laajalahti", rating: 3 },
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

    const randomWaypoints = Array.from({ length: 4 }, randomWaypoint);

    const pathInsert = await axios.post(
      "http://localhost:3001/api/paths/insert",
      randomPath
    );
    const path = await Promise.all(
      randomWaypoints.map(async (waypoint) => {
        const waypointInsert = await axios.post(
          "http://localhost:3001/api/waypoints/insert",
          {
            ...waypoint,
            pathID: pathInsert.data[0].pathID,
          }
        );
        return {
          ...waypoint,
          pathID: pathInsert.data[0].pathID,
          ID: waypointInsert.data[0].ID,
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

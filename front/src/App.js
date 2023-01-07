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
    axios.get("http://localhost:3001/api/get").then((res) => {
      setWaypoints(res.data);
    });
  }, []);

  const generate = () => {
    const randIndex = Math.floor(Math.random() * possibleWaypoints.length);
    const randomizedWaypoint = possibleWaypoints[randIndex];

    /*
    const routeName = "TEST"
    const rating = 5
    post route insert,
    loop waypoint inserts in index.js
    */

    axios
      .post("http://localhost:3001/api/insert", randomizedWaypoint)
      .then(() => {});
    setWaypoints([...waypoints, randomizedWaypoint]);
  };
  return (
    <div>
      <h1>PathBuilder</h1>
      <button onClick={generate}>Generate waypoint!</button>
      {waypoints.map((waypoint) => (
        <p key={waypoint.id}>
          {waypoint.name} of rating {waypoint.rating}
        </p>
      ))}
    </div>
  );
};

export default App;

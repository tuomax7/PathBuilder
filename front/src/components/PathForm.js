import React, { useState } from "react";

import axios from "axios";

const possibleWaypoints = [
  { name: "Leppävaara", rating: 5 },
  { name: "Tapiola", rating: 4 },
  { name: "Otaniemi", rating: 3 },
  { name: "Niittykumpu", rating: 3 },
  { name: "Matinkylä", rating: 2 },
  { name: "Laajalahti", rating: 3 },
];

const PathForm = ({ waypoints, setWaypoints, paths, setPaths }) => {
  const [pathname, setPathname] = useState("");

  const generate = async (e) => {
    e.preventDefault();
    const randomWaypoint = () => {
      const randIndex = Math.floor(Math.random() * possibleWaypoints.length);
      const randomizedWaypoint = possibleWaypoints[randIndex];
      return randomizedWaypoint;
    };

    const randomPath = {
      name: pathname,
      rating: 3,
    };

    const randomWaypoints = [
      ...new Set(Array.from({ length: 4 }, randomWaypoint)),
    ];

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
    const concatedWaypoints = [...waypoints, ...path];
    setWaypoints(concatedWaypoints);
    setPaths(
      paths.concat({
        ...randomPath,
        ID: pathInsert.data[0].pathID,
      })
    );
    setPathname("");
  };
  return (
    <form onSubmit={generate}>
      <input
        type="text"
        name="pathname"
        placeholder="name your path..."
        onChange={(e) => setPathname(e.target.value)}
        value={pathname}
      />
      <button type="submit">Generate path!</button>
    </form>
  );
};

export default PathForm;

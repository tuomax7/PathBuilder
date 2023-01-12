import React, { useState } from "react";

import axios from "axios";

const possibleWaypoints = [
  { name: "Leppävaara" },
  { name: "Tapiola" },
  { name: "Otaniemi" },
  { name: "Niittykumpu" },
  { name: "Matinkylä" },
  { name: "Laajalahti" },
  { name: "Mankkaa" },
  { name: "Kuitinmäki" },
  { name: "Haukilahti" },
  { name: "Lehtisaari" },
  { name: "Kauniainen" },
  { name: "Henttaa" },
  { name: "Sinimäki" },
  { name: "Ymmersta" },
  { name: "Lukupuro" },
];

const numberOfWaypoints = 5;

const PathForm = ({ waypoints, setWaypoints, paths, setPaths }) => {
  const [pathname, setPathname] = useState("");

  const generate = async (e) => {
    e.preventDefault();
    const randomWaypoint = () => {
      const randIndex = Math.floor(Math.random() * possibleWaypoints.length);
      const randomizedWaypoint = possibleWaypoints[randIndex];
      return randomizedWaypoint;
    };

    const randomPathData = {
      name: pathname,
      likes: 0,
    };

    const randomWaypoints = [
      ...new Set(Array.from({ length: numberOfWaypoints }, randomWaypoint)),
    ];

    const randomPath = [...randomWaypoints, randomWaypoints[0]];

    //console.log(randomPath);

    const pathInsert = await axios.post(
      "http://localhost:3001/api/paths/insert",
      randomPathData
    );
    const path = await Promise.all(
      randomPath.map(async (waypoint) => {
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
        ...randomPathData,
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

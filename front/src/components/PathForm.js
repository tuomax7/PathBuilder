import React, { useState, useRef } from "react";

import axios from "axios";

import { useJsApiLoader } from "@react-google-maps/api";

import possibleWaypoints from "../waypoints.json";

const numberOfWaypoints = 3;

const libraries = ["places"];

const PathForm = ({ waypoints, setWaypoints, paths, setPaths }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });

  const [pathname, setPathname] = useState("");
  const [startName, setStartName] = useState("");

  const generate = async (e) => {
    e.preventDefault();

    const start = { name: startName };

    const randomWaypoint = () => {
      const waypointsWithoutStart = possibleWaypoints.filter(
        (wp) => wp.name !== start.name
      );
      const randIndex = Math.floor(
        Math.random() * waypointsWithoutStart.length - 1
      );
      const randomizedWaypoint = waypointsWithoutStart[randIndex];
      return randomizedWaypoint;
    };

    const randomPathData = {
      name: pathname,
      likes: 0,
    };

    const randomWaypoints = [
      ...new Set(Array.from({ length: numberOfWaypoints }, randomWaypoint)),
    ];

    const randomPath = [start, ...randomWaypoints, start];

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
  if (!isLoaded) {
    return <div>Google maps loading...</div>;
  }
  return (
    <form onSubmit={generate}>
      <input
        type="text"
        name="pathname"
        placeholder="give your path a name..."
        onChange={(e) => setPathname(e.target.value)}
        value={pathname}
      />
      <select id="dropdown" onChange={(e) => setStartName(e.target.value)}>
        {possibleWaypoints
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort()
          .map((wp) => (
            <option key={wp.name} value={wp.name}>
              {wp.name}
            </option>
          ))}
      </select>
      <button type="submit">Generate path!</button>
    </form>
  );
};

export default PathForm;

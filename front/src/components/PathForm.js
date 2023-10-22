import React, { useState } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

import { getMapPath } from "../services/map.ts";
import pathService from "../services/path.ts";

import generatePath from "../utils/pathgen.js";
import possibleWaypoints from "../waypoints.json";

import { TextField, Button, Select, MenuItem } from "@mui/material";

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

    const randomPathData = {
      name: pathname,
      likes: 0,
      exhausting: 0,
      natural: 0,
      fun: 0,
    };

    const randomPath = generatePath(startName);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await getMapPath(directionsService, randomPath);
    const distanceResponse = results.routes[0].legs[0].distance.value;
    const durationResponse = results.routes[0].legs[0].duration.value;

    const pathInsert = await pathService.createPath(
      randomPathData,
      distanceResponse,
      durationResponse,
      randomPath
    );

    const path = await pathService.createWayPoints(randomPath, pathInsert);

    const concatedWaypoints = [...waypoints, ...path];

    setWaypoints(concatedWaypoints);
    setPaths(
      paths.concat({
        ...randomPathData,
        ID: pathInsert.pathID,
        distance: distanceResponse,
        duration: durationResponse,
      })
    );
    setPathname("");
  };
  if (!isLoaded) {
    return <div>Google maps loading...</div>;
  }
  return (
    <form onSubmit={generate}>
      <TextField
        type="text"
        name="pathname"
        placeholder="name your path..."
        onChange={(e) => setPathname(e.target.value)}
        value={pathname}
        style={{ margin: "5px" }}
      />
      <Select
        id="dropdown"
        defaultValue="origin"
        onChange={(e) => setStartName(e.target.value)}
        style={{ margin: "5px" }}
      >
        <MenuItem disabled value="origin">
          Choose start
        </MenuItem>
        {possibleWaypoints
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort()
          .map((wp) => (
            <MenuItem key={wp.name} value={wp.name}>
              {wp.name}
            </MenuItem>
          ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ margin: "5px" }}
        disabled={startName === "" || pathname.trim() === ""}
      >
        Generate path!
      </Button>
    </form>
  );
};

export default PathForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPath } from "../../reducers/pathReducer.js";

import { useJsApiLoader } from "@react-google-maps/api";

import { getMapPath } from "../../services/map.ts";
import pathService from "../../services/path.ts";

import generatePath from "../../utils/pathgen.js";
import possibleWaypoints from "../../waypoints.json";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import path from "../../services/path.ts";

const libraries = ["places"];

const PathForm = () => {
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });

  const [pathname, setPathname] = useState("");
  const [startName, setStartName] = useState("");
  const [waypointCount, setWaypointCount] = useState(4);

  const generate = async (e) => {
    e.preventDefault();

    const randomPathData = {
      name: pathname,
      exhausting: 0,
      nature: 0,
      fun: 0,
    };

    const randomPath = generatePath(startName, waypointCount);

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

    await pathService.createWayPoints(randomPath, pathInsert);

    const newPath = {
      ...randomPathData,
      ID: pathInsert.pathID,
      distance: distanceResponse,
      duration: durationResponse,
    };
    dispatch(createPath(newPath));

    setPathname("");
  };
  if (!isLoaded) {
    return <div>Google maps loading...</div>;
  }
  return (
    <form onSubmit={generate} style={{ alignItems: "center" }}>
      <TextField
        id="pathNameInput"
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
      <Box display="flex" flexDirection="row" my={4}>
        <Typography>Number of waypoints:</Typography>
        <Slider
          aria-label="Number of waypoints"
          value={waypointCount}
          step={1}
          marks
          min={1}
          max={7}
          valueLabelDisplay="on"
          sx={{ mx: 2, width: "70%" }}
          onChange={(e) => setWaypointCount(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ margin: "5px" }}
        id="submit"
        disabled={startName === "" || pathname.trim() === ""}
      >
        Generate path!
      </Button>
    </form>
  );
};

export default PathForm;

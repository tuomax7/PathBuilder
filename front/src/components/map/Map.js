import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { Button, Typography, Box } from "@mui/material";

import { calculateRoute, calculateStartPos } from "../../services/map.ts";

import GMap from "./GMap.js";

import {
  durationString,
  metersToKilometers,
  calculateDirectionsURL,
} from "../../utils/utils.js";

const libraries = ["places"];

const Map = ({ path, waypoints }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [directionsURL, setDirectionsURL] = useState("");

  useEffect(() => {
    const renderPath = async () => {
      setDirectionsResponse(
        await calculateRoute({ ...path, waypoints }, setDirectionsResponse)
      );
      setStartPos(await calculateStartPos(waypoints[0].name));
    };

    if (isLoaded) {
      renderPath();
      setDirectionsURL(calculateDirectionsURL(waypoints));
    }
  }, [isLoaded, path, waypoints, directionsURL]);

  if (!isLoaded) {
    return <Box>No map!</Box>;
  }

  return (
    <Box style={{ marginBottom: 20 }}>
      <Box style={{ height: "50vh" }}>
        <GMap directionsResponse={directionsResponse} startPos={startPos} />
      </Box>
      {!path.distance || !path.duration ? null : (
        <Box marginY={2}>
          <Typography>
            Distance: {metersToKilometers(path.distance)} km
          </Typography>
          <Typography>Duration: {durationString(path.duration)}</Typography>
        </Box>
      )}

      <Button
        href={directionsURL}
        target="_blank"
        rel="noreferrer"
        variant="outlined"
      >
        Open in Google Maps!
      </Button>
    </Box>
  );
};

export default Map;

import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { Button } from "@mui/material";

import { calculateRoute, calculateStartPos } from "../services/map.ts";

import GMap from "./GMap.js";

import {
  minsToRunning,
  metersToKilometers,
  calculateDirectionsURL,
} from "../utils/utils.js";

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
    return <div>No map!</div>;
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ height: "50vh", width: "80%" }}>
        <GMap directionsResponse={directionsResponse} startPos={startPos} />
      </div>
      {!path.distance || !path.duration ? null : (
        <div>
          <p>Distance: {metersToKilometers(path.distance)} km</p>
          <p>Duration: {minsToRunning(path.duration)} mins by running</p>
        </div>
      )}

      <Button
        href={directionsURL}
        target="_blank"
        rel="noreferrer"
        variant="outlined"
      >
        Open in Google Maps!
      </Button>
    </div>
  );
};

export default Map;

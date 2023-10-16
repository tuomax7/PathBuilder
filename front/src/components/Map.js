import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { Button } from "@mui/material";

import mapService from "../services/map.js";

import GMap from "./GMap.js";

import { minsToRunning, metersToKilometers } from "../utils.js";

const libraries = ["places"];

const Map = ({ path, waypoints }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [directionsURL, setDirectionsURL] = useState("");

  const calculateStartPos = async (startName) => {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();

    const startPosRequest = await geocoder.geocode({
      address: startName,
    });

    const startPosLat =
      await startPosRequest.results[0].geometry.location.lat();
    const startPosLng =
      await startPosRequest.results[0].geometry.location.lng();
    await setStartPos({ lat: startPosLat, lng: startPosLng });
  };

  const calculateRoute = async (path) => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await mapService.getMapPath(
      directionsService,
      path.waypoints
    );

    setDirectionsResponse(results);
  };

  const calculateDirectionsURL = (waypoints) => {
    const origin = waypoints[0].name;
    const waypointString = waypoints
      .slice(1, waypoints.length - 1)
      .map((wp) => wp.name)
      .join("|");

    setDirectionsURL(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${origin}&waypoints=${waypointString}&travelmode=walking`
    );
  };

  useEffect(() => {
    if (isLoaded) {
      calculateRoute({ ...path, waypoints });
      calculateStartPos(waypoints[0].name);
      calculateDirectionsURL(waypoints);
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

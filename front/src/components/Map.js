import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

import mapService from "../services/map.js";

import axios from "axios";

const center = { lat: 60.18564, lng: 24.77457 };
const libraries = ["places"];

const Map = ({ path, waypoints }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });
  const [gMap, setMap] = useState(/** @type google.maps.Map */ (null));

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState(0);

  const calculateRoute = async (path) => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await mapService.getMapPath(
      directionsService,
      path.waypoints
    );

    const distanceResponse = results.routes[0].legs[0].distance.text;
    const durationResponse = results.routes[0].legs[0].duration.value;

    await axios.put(`http://localhost:3001/api/paths/${path.ID}/update`, {
      ...path,
      distance: distanceResponse,
      duration: durationResponse,
    });

    setDirectionsResponse(results);
    setDistance(distanceResponse);
    setDuration(durationResponse);
  };

  useEffect(() => {
    if (isLoaded) {
      calculateRoute({ ...path, waypoints });
    }
  }, [isLoaded, path, waypoints]);

  if (!isLoaded) {
    return <div>No map!</div>;
  }

  return (
    <div>
      <div style={{ height: "40vh", width: "80%" }}>
        <GoogleMap
          center={center}
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            mapId: process.env.REACT_APP_MAPS_ID,
          }}
          onLoad={() => setMap(gMap)}
        >
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{ suppressMarkers: true }}
            />
          )}
        </GoogleMap>
      </div>
      {!distance || !duration ? null : (
        <div>
          <p>Distance: {distance}</p>
          <p>
            Duration: {Math.round((duration * 0.5581395) / 60.0)} mins by
            running
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;

import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

import mapService from "../services/map.js";

const center = { lat: 60.18564, lng: 24.77457 };
const libraries = ["places"];

const Map = ({ path }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });
  const [gMap, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const calculateRoute = async () => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await mapService.getMapPath(directionsService, path);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance);
    setDuration(results.routes[0].legs[0].duration);
  };
  if (!isLoaded) {
    return <div>No map!</div>;
  }
  return (
    <div>
      <h3>Maps</h3>
      <button onClick={calculateRoute}>Show path!</button>
      <div style={{ height: "50vh", width: "75vh" }}>
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
          <p>Distance: {distance.text}</p>
          <p>
            Duration: {Math.round((duration.value * 0.5581395) / 60.0)} mins by
            running
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;

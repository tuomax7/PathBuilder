import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";

import mapService from "../services/map.js";

import { minsToRunning, metersToKilometers } from "../utils.js";

const center = { lat: 60.18564, lng: 24.77457 };
const libraries = ["places"];

const Map = ({ path, waypoints }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });
  const [gMap, setMap] = useState(/** @type google.maps.Map */ (null));

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [startPos, setStartPos] = useState(null);

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

  useEffect(() => {
    if (isLoaded) {
      calculateRoute({ ...path, waypoints });
      calculateStartPos(waypoints[0].name);
    }
  }, [isLoaded, path, waypoints]);

  if (!isLoaded) {
    return <div>No map!</div>;
  }

  return (
    <div>
      <div style={{ height: "50vh", width: "80%" }}>
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
            <div>
              <Marker position={startPos} />
              <DirectionsRenderer
                directions={directionsResponse}
                options={{
                  suppressMarkers: true,
                }}
              />
            </div>
          )}
        </GoogleMap>
      </div>
      {!path.distance || !path.duration ? null : (
        <div>
          <p>Distance: {metersToKilometers(path.distance)} km</p>
          <p>Duration: {minsToRunning(path.duration)} mins by running</p>
        </div>
      )}
    </div>
  );
};

export default Map;

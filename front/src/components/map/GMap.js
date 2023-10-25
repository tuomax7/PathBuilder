import React from "react";

import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

const center = { lat: 60.18564, lng: 24.77457 };

const GMap = ({ directionsResponse, startPos }) => {
  return (
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
  );
};

export default GMap;

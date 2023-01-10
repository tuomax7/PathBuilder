import React, { useEffect, useState, useRef } from "react";

import axios from "axios";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 60.18564, lng: 24.77457 };

const possibleWaypoints = [
  { name: "Leppävaara", rating: 5 },
  { name: "Tapiola", rating: 4 },
  { name: "Otaniemi", rating: 3 },
  { name: "Niittykumpu", rating: 3 },
  { name: "Matinkylä", rating: 2 },
  { name: "Laajalahti", rating: 3 },
];

const libraries = ["places"];

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries,
  });

  const [gMap, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.BICYCLING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const [pathname, setPathname] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/paths/get").then((res) => {
      setPaths(res.data);
    });
    axios.get("http://localhost:3001/api/waypoints/get").then((res) => {
      setWaypoints(res.data);
    });
  }, []);

  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) =>
    waypoints.filter((waypoint) => waypoint.pathID === ID);

  const generate = async (e) => {
    e.preventDefault();
    const randomWaypoint = () => {
      const randIndex = Math.floor(Math.random() * possibleWaypoints.length);
      const randomizedWaypoint = possibleWaypoints[randIndex];
      return randomizedWaypoint;
    };

    const randomPath = {
      name: pathname,
      rating: 3,
    };

    const randomWaypoints = [
      ...new Set(Array.from({ length: 4 }, randomWaypoint)),
    ];

    const pathInsert = await axios.post(
      "http://localhost:3001/api/paths/insert",
      randomPath
    );
    const path = await Promise.all(
      randomWaypoints.map(async (waypoint) => {
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
        ...randomPath,
        ID: pathInsert.data[0].pathID,
      })
    );
    setPathname("");
  };
  if (!isLoaded) {
    return <div></div>;
  }
  return (
    <div>
      <h1>PathBuilder</h1>
      <form onSubmit={generate}>
        <input
          type="text"
          name="pathname"
          placeholder="name your path..."
          onChange={(e) => setPathname(e.target.value)}
          value={pathname}
        />
        <button type="submit">Generate path!</button>
      </form>
      <h3>Waypoints</h3>
      <ul>
        {[...new Set(waypoints.map((wp) => wp.name))].map((waypoint) => (
          <li key={waypoint}>{waypoint}</li>
        ))}
      </ul>
      <h3>All paths</h3>
      {paths.map((path) => (
        <div key={path.ID}>
          <button>
            {path.name} of rating {path.rating}
          </button>
          <ol>
            {waypointsOfPathID(path.ID).map((waypoint) => (
              <li key={waypoint.ID}>{waypoint.name}</li>
            ))}
          </ol>
        </div>
      ))}
      <h3>Maps</h3>
      <div>
        <Autocomplete>
          <input type="text" placeholder="Destination" ref={destinationRef} />
        </Autocomplete>
        <Autocomplete>
          <input type="text" placeholder="Origin" ref={originRef} />
        </Autocomplete>
        <button onClick={calculateRoute}>Show path!</button>
        <div style={{ height: "100vh", width: "80%" }}>
          <GoogleMap
            center={center}
            zoom={13}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={() => setMap(gMap)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
        <p>Distance: {distance}</p>
        <p>Duration: {duration}</p>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import PathForm from "./components/PathForm.js";
//import WayPointList from "./components/WaypointList.js";
import PathList from "./components/PathList.js";

import pathService from "./services/path.js";

import { Container } from "@mui/material";

const App = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    pathService.getPaths().then((res) => setPaths(res));
    pathService.getWaypoints().then((res) => setWaypoints(res));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/002/920/438/original/abstract-city-map-seamless-pattern-roads-navigation-gps-use-for-pattern-fills-surface-textures-web-page-background-wallpaper-illustration-free-vector.jpg")`,
        height: "100vh",
      }}
    >
      <Container
        style={{
          width: "75%",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "#ECE7DC",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h1>FindMyPath</h1>
          <PathForm
            waypoints={waypoints}
            setWaypoints={setWaypoints}
            paths={paths}
            setPaths={setPaths}
          />
        </div>

        {/*<WayPointList waypoints={waypoints} /> */}
        <PathList waypoints={waypoints} paths={paths} setPaths={setPaths} />
      </Container>
    </div>
  );
};

export default App;

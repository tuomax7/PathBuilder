import React, { useEffect, useState } from "react";
import PathForm from "./components/PathForm.js";
//import WayPointList from "./components/WaypointList.js";
import PathList from "./components/PathList.js";

import pathService from "./services/path.ts";

import { Container } from "@mui/material";

const App = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    pathService.getPaths().then((res) => {
      setPaths(res);
    });
    pathService.getWaypoints().then((res) => {
      setWaypoints(res);
    });
  }, []);

  return (
    <Container
      style={{
        width: "75%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ECE7DC",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "50px",
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
  );
};

export default App;

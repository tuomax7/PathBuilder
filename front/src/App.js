import React, { useEffect, useState } from "react";
import PathForm from "./components/PathForm.js";
import WayPointList from "./components/WaypointList.js";
import PathList from "./components/PathList.js";
import Map from "./components/Map.js";

import axios from "axios";

const App = () => {
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

  return (
    <div>
      <h1>PathBuilder</h1>
      <PathForm
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        paths={paths}
        setPaths={setPaths}
      />
      <WayPointList waypoints={waypoints} />
      <PathList waypoints={waypoints} paths={paths} />
      <Map />
    </div>
  );
};

export default App;

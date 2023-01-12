import React, { useEffect, useState } from "react";
import PathForm from "./components/PathForm.js";
import WayPointList from "./components/WaypointList.js";
import PathList from "./components/PathList.js";

import pathService from "./services/path.js";

const App = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    pathService.getPaths().then((res) => setPaths(res));
    pathService.getWaypoints().then((res) => setWaypoints(res));
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
      <PathList waypoints={waypoints} paths={paths} setPaths={setPaths} />
    </div>
  );
};

export default App;

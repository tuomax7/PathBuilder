import { createRef } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";

import axios from "axios";

const PathList = ({ paths, setPaths, waypoints }) => {
  const mapRef = createRef();

  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) =>
    waypoints.filter((waypoint) => waypoint.pathID === ID);

  const handleLike = async (pathToUpdate) => {
    const response = await axios.put(
      `http://localhost:3001/api/paths/${pathToUpdate.ID}`,
      pathToUpdate
    );
    const updatedPath = await response.data;

    const updatedPaths = paths.map((path) =>
      path.ID === pathToUpdate.ID ? updatedPath : path
    );

    setPaths(updatedPaths);
  };

  return (
    <div>
      <h3>All paths</h3>
      {paths
        .sort((a, b) => b.likes - a.likes)
        .map((path) => (
          <div key={path.ID}>
            <h4>
              {path.name} with {path.likes} likes
            </h4>
            <Togglable buttonLabel="View path" ref={mapRef}>
              <ol>
                {waypointsOfPathID(path.ID).map((waypoint) => (
                  <li key={waypoint.ID}>{waypoint.name}</li>
                ))}
              </ol>
              <Map path={waypointsOfPathID(path.ID)} />
              <button onClick={() => handleLike(path)}>Like path!</button>
            </Togglable>
          </div>
        ))}
    </div>
  );
};

export default PathList;

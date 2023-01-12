import { createRef } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";

const PathList = ({ paths, waypoints }) => {
  const mapRef = createRef();

  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) =>
    waypoints.filter((waypoint) => waypoint.pathID === ID);

  return (
    <div>
      <h3>All paths</h3>
      {paths.map((path) => (
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
            <button>Like path!</button>
          </Togglable>
        </div>
      ))}
    </div>
  );
};

export default PathList;

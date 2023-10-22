import { createRef } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";
import ReactButton from "./ReactButton.js";

import { minsToRunning, metersToKilometers } from "../utils/utils.js";

import { TableCell, TableRow } from "@mui/material";

const Path = ({ waypoints, paths, setPaths, path }) => {
  const mapRef = createRef();
  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) => {
    return waypoints.filter((waypoint) => waypoint.pathID === ID);
  };

  return (
    <TableRow>
      <TableCell>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>{path.name}</h3>
          <ReactButton
            reactionName="fun"
            pathToUpdate={path}
            setPaths={setPaths}
            paths={paths}
          />
          <ReactButton
            reactionName="nature"
            pathToUpdate={path}
            setPaths={setPaths}
            paths={paths}
          />
          <ReactButton
            reactionName="exhausting"
            pathToUpdate={path}
            setPaths={setPaths}
            paths={paths}
          />
        </div>

        {path.distance && path.duration ? (
          <p>
            {metersToKilometers(path.distance)} km,{" "}
            {minsToRunning(path.duration)} mins
          </p>
        ) : (
          <p>Show to build path!</p>
        )}
        <Togglable buttonLabel="Show path!" ref={mapRef}>
          Waypoints:
          <ol>
            {waypointsOfPathID(path.ID).map((waypoint) => (
              <li key={waypoint.ID}>{waypoint.name}</li>
            ))}
          </ol>
          <Map waypoints={waypointsOfPathID(path.ID)} path={path} />
        </Togglable>
      </TableCell>
    </TableRow>
  );
};

export default Path;

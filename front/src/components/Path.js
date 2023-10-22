import { createRef } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";

import pathService from "../services/path.ts";

import { minsToRunning, metersToKilometers } from "../utils/utils.js";

import { TableCell, TableRow, Button } from "@mui/material";

const Path = ({ waypoints, paths, setPaths, path }) => {
  const mapRef = createRef();
  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) => {
    return waypoints.filter((waypoint) => waypoint.pathID === ID);
  };

  const handleLike = async (pathToUpdate) => {
    const updatedPath = await pathService.updatePathLikes(pathToUpdate);

    const updatedPaths = paths.map((path) =>
      path.ID === pathToUpdate.ID ? updatedPath : path
    );

    setPaths(updatedPaths);
  };
  return (
    <TableRow>
      <TableCell>
        <h3>
          '{path.name}' with {path.likes} likes
        </h3>

        <div>
          😁: {path.fun} 🌳: {path.natural} 💪: {path.exhausting}
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
          <Button
            variant="contained"
            color="success"
            onClick={() => handleLike(path)}
            style={{ marginRight: "10px" }}
          >
            Like!
          </Button>
        </Togglable>
      </TableCell>
    </TableRow>
  );
};

export default Path;

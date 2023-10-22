import { createRef } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";

import pathService from "../services/path.ts";

import { minsToRunning, metersToKilometers } from "../utils/utils.js";

import { TableCell, TableRow } from "@mui/material";

const ReactButton = ({ paths, pathToUpdate, reactionName, setPaths }) => {
  const handleReaction = async () => {
    const updatedPath = await pathService.updatePathReactions(
      pathToUpdate,
      reactionName
    );

    const updatedPaths = paths.map((path) =>
      path.ID === pathToUpdate.ID ? updatedPath : path
    );

    setPaths(updatedPaths);
  };

  let icon = "";
  let reactionCount = 0;
  switch (reactionName) {
    case "fun":
      icon = "😁";
      reactionCount = pathToUpdate.fun;
      break;
    case "nature":
      icon = "🌳";
      reactionCount = pathToUpdate.nature;
      break;
    case "exhausting":
      icon = "💪";
      reactionCount = pathToUpdate.exhausting;
      break;
    default:
      icon = "";
  }
  return (
    <div>
      <button name="fun" onClick={() => handleReaction()} style={{ margin: 5 }}>
        {icon}
      </button>
      {reactionCount}
    </div>
  );
};

const Path = ({ waypoints, paths, setPaths, path }) => {
  const mapRef = createRef();
  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) => {
    return waypoints.filter((waypoint) => waypoint.pathID === ID);
  };

  return (
    <TableRow>
      <TableCell>
        <h3>{path.name}</h3>
        <div style={{ display: "flex" }}>
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

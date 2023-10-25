import { createRef } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";
import ReactButton from "./ReactButton.js";

import { durationString, metersToKilometers } from "../utils/utils.js";

import {
  TableCell,
  TableRow,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";

const Path = ({ waypoints, paths, setPaths, path }) => {
  const mapRef = createRef();
  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) => {
    return waypoints.filter((waypoint) => waypoint.pathID === ID);
  };

  const waypointLabel = (index) => {
    switch (index) {
      case 0:
        return "(start)";
      case waypointsOfPathID(path.ID).length - 1:
        return "(end)";
      default:
        return "";
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Box style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Typography variant="h3">{path.name}</Typography>
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
        </Box>

        {path.distance && path.duration ? (
          <Typography marginBottom={2}>
            {metersToKilometers(path.distance)} km,{" "}
            {durationString(path.duration)}
          </Typography>
        ) : (
          <Typography>Show to build path!</Typography>
        )}
        <Togglable buttonLabel="Show path!" ref={mapRef}>
          <Typography>Route:</Typography>
          <List>
            {waypointsOfPathID(path.ID).map((waypoint, index) => (
              <ListItem key={waypoint.ID} sx={{ p: 0.5 }}>
                {index + 1}. {waypoint.name} {waypointLabel(index)}
              </ListItem>
            ))}
          </List>
          <Map waypoints={waypointsOfPathID(path.ID)} path={path} />
        </Togglable>
      </TableCell>
    </TableRow>
  );
};

export default Path;

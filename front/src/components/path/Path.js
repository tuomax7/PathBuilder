import { createRef, useEffect, useState } from "react";
import Togglable from "../ui-elements/Togglable.js";
import Map from "../map/Map.js";
import ReactButton from "../ui-elements/ReactButton.js";
import pathService from "../../services/path.ts";

import { durationString, metersToKilometers } from "../../utils/utils.js";

import {
  TableCell,
  TableRow,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";

const Path = ({ path }) => {
  const mapRef = createRef();

  const [waypoints, setWaypoints] = useState([]);

  useEffect(() => {
    const fetchWaypoints = async () => {
      const response = await pathService.getPath(path.ID);

      setWaypoints(response.waypoints);
    };
    fetchWaypoints();
  }, [path.ID]);

  const waypointLabel = (index) => {
    switch (index) {
      case 0:
        return "(start)";
      case waypoints.length - 1:
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
          <ReactButton reactionName="fun" pathToUpdate={path} />
          <ReactButton reactionName="nature" pathToUpdate={path} />
          <ReactButton reactionName="exhausting" pathToUpdate={path} />
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
            {waypoints.map((waypoint, index) => (
              <ListItem key={waypoint.ID} sx={{ p: 0.5 }}>
                {index + 1}. {waypoint.name} {waypointLabel(index)}
              </ListItem>
            ))}
          </List>
          <Map waypoints={waypoints} path={path} />
        </Togglable>
      </TableCell>
    </TableRow>
  );
};

export default Path;

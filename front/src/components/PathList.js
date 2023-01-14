import { createRef, useState } from "react";
import Togglable from "./Togglable.js";
import Map from "./Map.js";

import axios from "axios";

import { minsToRunning, metersToKilometers } from "../utils.js";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

const PathList = ({ paths, setPaths, waypoints }) => {
  const mapRef = createRef();

  const [sortBy, setSortBy] = useState("likes");

  const sortedPaths = () => {
    if (sortBy === "distance")
      return paths.sort((a, b) => b.distance - a.distance);
    else if (sortBy === "duration")
      return paths.sort((a, b) => b.duration - a.duration);
    else return paths.sort((a, b) => b.likes - a.likes);
  };

  //KORVAA SQL-KYSELYLLÄ
  const waypointsOfPathID = (ID) =>
    waypoints.filter((waypoint) => waypoint.pathID === ID);

  const handleLike = async (pathToUpdate) => {
    const response = await axios.put(
      `http://localhost:3001/api/paths/${pathToUpdate.ID}/like`,
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
      <div>
        <h3>Sort by:</h3>
        <RadioGroup
          style={{ display: "inline" }}
          defaultValue="likes"
          name="radio-buttons-group"
        >
          <FormControlLabel
            defaultChecked
            value="likes"
            control={<Radio />}
            label="Likes"
            onChange={() => setSortBy("likes")}
          />
          <FormControlLabel
            value="distance"
            control={<Radio />}
            label="Distance"
            onChange={() => setSortBy("distance")}
          />
          <FormControlLabel
            value="duration"
            control={<Radio />}
            label="Duration"
            onChange={() => setSortBy("duration")}
          />
        </RadioGroup>
      </div>
      <h3>All paths</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedPaths().map((path) => (
              <TableRow key={path.ID}>
                <TableCell>
                  <h3>
                    '{path.name}' with {path.likes} likes
                  </h3>
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
                    <Map
                      waypoints={waypointsOfPathID(path.ID)}
                      path={{ ID: path.ID, name: path.name, likes: path.likes }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleLike(path)}
                    >
                      Like path!
                    </Button>
                  </Togglable>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PathList;

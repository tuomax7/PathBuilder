import { useState } from "react";

import Path from "./Path.js";
import Sorter from "./Sorter.js";

import { Table, TableBody, TableContainer, Paper } from "@mui/material";

const PathList = ({ paths, setPaths, waypoints }) => {
  const [sortBy, setSortBy] = useState("likes");

  const sortedPaths = () => {
    if (sortBy === "distance")
      return paths.sort((a, b) => b.distance - a.distance);
    else if (sortBy === "duration")
      return paths.sort((a, b) => b.duration - a.duration);
    else if (sortBy === "name") {
      return paths.sort((a, b) => a.name.localeCompare(b.name));
    } else return paths.sort((a, b) => b.likes - a.likes);
  };

  return (
    <div>
      <Sorter setSortBy={setSortBy} />
      <h3>All paths</h3>
      {sortedPaths().length === 0 ? (
        <p>Start by generating a path!</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {sortedPaths().map((path) => (
                <Path
                  key={path.ID}
                  paths={paths}
                  setPaths={setPaths}
                  path={path}
                  waypoints={waypoints}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PathList;

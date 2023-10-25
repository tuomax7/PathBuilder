import { useState } from "react";

import Path from "./Path.js";
import Sorter from "../ui-elements/Sorter.js";

import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const PathList = ({ paths, setPaths, waypoints }) => {
  const [sortBy, setSortBy] = useState("reactions");

  const sortedPaths = () => {
    if (sortBy === "distance")
      return paths.sort((a, b) => b.distance - a.distance);
    else if (sortBy === "duration")
      return paths.sort((a, b) => b.duration - a.duration);
    else if (sortBy === "name") {
      return paths.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return paths.sort(
        (a, b) =>
          b.fun + b.nature + b.exhausting - (a.fun + a.nature + a.exhausting)
      );
    }
  };

  return (
    <Box paddingY={2}>
      {sortedPaths().length === 0 ? (
        <Typography>Start by generating a path!</Typography>
      ) : (
        <Box>
          <Sorter setSortBy={setSortBy} />
          <Typography variant="h2" marginBottom={2}>
            All paths
          </Typography>
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
        </Box>
      )}
    </Box>
  );
};

export default PathList;

import { useSelector } from "react-redux";

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

const PathList = ({ waypoints }) => {
  const paths = useSelector(({ sortBy, paths }) => {
    const sortedPaths = [...paths];

    if (sortBy === "distance")
      return sortedPaths.sort((a, b) => b.distance - a.distance);
    else if (sortBy === "duration")
      return sortedPaths.sort((a, b) => b.duration - a.duration);
    else if (sortBy === "name") {
      return sortedPaths.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return sortedPaths.sort(
        (a, b) =>
          b.fun + b.nature + b.exhausting - (a.fun + a.nature + a.exhausting)
      );
    }
  });

  return (
    <Box paddingY={2}>
      {paths.length === 0 ? (
        <Typography>Start by generating a path!</Typography>
      ) : (
        <Box>
          <Sorter />
          <Typography variant="h2" marginBottom={2}>
            All paths
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {paths.map((path) => (
                  <Path
                    key={path.ID}
                    paths={paths}
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

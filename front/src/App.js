import React, { useEffect, useState } from "react";
import PathForm from "./components/path/PathForm.js";
import PathList from "./components/path/PathList.js";

import { setPaths } from "./reducers/pathReducer.js";
import { useDispatch } from "react-redux";

import pathService from "./services/path.ts";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Container, Typography, Box } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();

  const [waypoints, setWaypoints] = useState([]);

  useEffect(() => {
    pathService.getPaths().then((res) => {
      dispatch(setPaths(res));
    });
    pathService.getWaypoints().then((res) => {
      setWaypoints(res);
    });
  }, [dispatch]);

  const THEME = createTheme({
    typography: {
      fontFamily: `"Roboto", "Helvetica", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      h1: {
        fontSize: 40,
      },
      h2: {
        fontSize: 32,
      },
      h3: {
        fontSize: 24,
      },
    },
  });

  return (
    <ThemeProvider theme={THEME}>
      <Container
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          paddingTop: 5,
          marginTop: 30,
        }}
      >
        <Box
          style={{
            backgroundColor: "#ECE7DC",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Typography variant="h1" style={{ marginTop: 10 }}>
            FindMyPath
          </Typography>
          <PathForm waypoints={waypoints} setWaypoints={setWaypoints} />
        </Box>

        <PathList waypoints={waypoints} />
      </Container>
    </ThemeProvider>
  );
};

export default App;

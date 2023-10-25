import React, { useEffect, useState } from "react";
import PathForm from "./components/path/PathForm.js";
import PathList from "./components/path/PathList.js";

import pathService from "./services/path.ts";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Container, Typography, Box } from "@mui/material";

const App = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    pathService.getPaths().then((res) => {
      setPaths(res);
    });
    pathService.getWaypoints().then((res) => {
      setWaypoints(res);
    });
  }, []);

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
          <PathForm
            waypoints={waypoints}
            setWaypoints={setWaypoints}
            paths={paths}
            setPaths={setPaths}
          />
        </Box>

        <PathList waypoints={waypoints} paths={paths} setPaths={setPaths} />
      </Container>
    </ThemeProvider>
  );
};

export default App;

import pathService from "../services/path.ts";

import { IconButton, Box } from "@mui/material";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MoodIcon from "@mui/icons-material/Mood";
import ForestIcon from "@mui/icons-material/Forest";

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

  let icon = <MoodIcon color="primary" />;
  let reactionCount = 0;

  switch (reactionName) {
    case "fun":
      icon = <MoodIcon color="primary" />;
      reactionCount = pathToUpdate.fun;
      break;
    case "nature":
      icon = <ForestIcon color="primary" />;
      reactionCount = pathToUpdate.nature;
      break;
    case "exhausting":
      icon = <DirectionsRunIcon color="primary" />;
      reactionCount = pathToUpdate.exhausting;
      break;
    default:
      icon = <MoodIcon color="primary" />;
  }
  return (
    <Box sx={{ mx: 1 }}>
      <IconButton name={reactionName} onClick={() => handleReaction()}>
        {icon}
      </IconButton>
      {reactionCount}
    </Box>
  );
};

export default ReactButton;

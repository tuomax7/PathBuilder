import { useDispatch } from "react-redux";
import pathService from "../../services/path.ts";

import { IconButton, Box } from "@mui/material";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MoodIcon from "@mui/icons-material/Mood";
import ForestIcon from "@mui/icons-material/Forest";

import { addReaction } from "../../reducers/pathReducer.js";

const ReactButton = ({ pathToUpdate, reactionName }) => {
  const dispatch = useDispatch();

  const handleReaction = async () => {
    await pathService.updatePathReactions(pathToUpdate, reactionName);
    dispatch(addReaction({ pathToUpdate, reactionName }));
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

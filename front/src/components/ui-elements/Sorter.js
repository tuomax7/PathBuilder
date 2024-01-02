import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { sorterChange } from "../../reducers/pathSorterReducer.js";

const Sorter = () => {
  const dispatch = useDispatch();

  return (
    <Box marginBottom={2}>
      <Typography fontSize={18}>Sort by:</Typography>
      <RadioGroup
        style={{ display: "inline" }}
        defaultValue="reactions"
        name="radio-buttons-group"
      >
        <FormControlLabel
          defaultChecked
          value="reactions"
          control={<Radio />}
          label="Reactions"
          onChange={() => dispatch(sorterChange("reactions"))}
        />
        <FormControlLabel
          value="distance"
          control={<Radio />}
          label="Distance"
          onChange={() => dispatch(sorterChange("distance"))}
        />
        <FormControlLabel
          value="duration"
          control={<Radio />}
          label="Duration"
          onChange={() => dispatch(sorterChange("duration"))}
        />
        <FormControlLabel
          value="name"
          control={<Radio />}
          label="Name"
          onChange={() => dispatch(sorterChange("name"))}
        />
      </RadioGroup>
    </Box>
  );
};

export default Sorter;

import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";

const Sorter = ({ setSortBy }) => {
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
          onChange={() => setSortBy("reactions")}
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
        <FormControlLabel
          value="name"
          control={<Radio />}
          label="Name"
          onChange={() => setSortBy("name")}
        />
      </RadioGroup>
    </Box>
  );
};

export default Sorter;

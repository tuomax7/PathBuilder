import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Sorter = ({ setSortBy }) => {
  return (
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
        <FormControlLabel
          value="name"
          control={<Radio />}
          label="Name"
          onChange={() => setSortBy("name")}
        />
      </RadioGroup>
    </div>
  );
};

export default Sorter;

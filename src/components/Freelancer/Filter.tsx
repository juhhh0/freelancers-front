import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function Filter({setFilters}: {setFilters: (value: string) => void}) {
  return (
    <FormControl>
      <FormLabel id="filter">Filter</FormLabel>
      <RadioGroup
        row
        aria-labelledby="filter"
        defaultValue="all"
        name="radio-buttons-group"
        onChange={(e) => setFilters(e.target.value)}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel
          value="available"
          control={<Radio />}
          label="Available"
        />
        <FormControlLabel
          value="not-available"
          control={<Radio />}
          label="Not Available"
        />
      </RadioGroup>
    </FormControl>
  );
}

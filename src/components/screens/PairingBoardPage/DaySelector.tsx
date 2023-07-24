import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const DaySelector = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const currentDateObject = new Date();
    // Format the date as "YYYY-MM-DD" (required by the date type input)
    const formattedDate = currentDateObject.toISOString().slice(0, 10);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <Grid container>
      <Grid item>
        <TextField
          type="date"
          label="Select Pairing Day"
          onChange={(e) => setCurrentDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          value={currentDate}
        />
      </Grid>
    </Grid>
  );
};

export default DaySelector;

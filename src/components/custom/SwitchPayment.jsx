import React, { useState } from "react";
import { Switch, FormControlLabel, Box, Typography } from "@mui/material";

const SwitchPayment = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.handleChange(event.target.checked);
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" style={{ marginRight: 8 }}>
        ต้นคงที่
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="primary"
          />
        }
      />
      <Typography variant="body1" style={{ marginLeft: 8 }}>
        แฟลตเรต
      </Typography>
    </Box>
  );
};

export default SwitchPayment;

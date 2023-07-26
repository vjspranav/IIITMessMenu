import React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const IconSwitch = ({ isDark, onToggle }) => {
  return (
    <IconButton color="inherit" onClick={onToggle}>
      {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default IconSwitch;

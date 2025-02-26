import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ text, onClick, variant = "contained", color = "primary" }) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick} sx={{ margin: "8px" }}>
      {text}
    </MuiButton>
  );
};

export default Button;

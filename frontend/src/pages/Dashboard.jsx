import React from "react";
import { Typography, Container } from "@mui/material";

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Typography>
        Use the sidebar to navigate and automate tasks!
      </Typography>
    </Container>
  );
};

export default Dashboard;

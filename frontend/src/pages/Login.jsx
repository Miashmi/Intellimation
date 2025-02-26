import React, { useState } from "react";
import { Container, TextField, Typography, Box } from "@mui/material";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@example.com" && password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Login" onClick={handleLogin} />
      </Box>
    </Container>
  );
};

export default Login;

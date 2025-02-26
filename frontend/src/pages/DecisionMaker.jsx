import React, { useState } from "react";
import { Container, TextField, Typography, Box, MenuItem, Paper } from "@mui/material";
import Button from "../components/Button";
import axios from "axios";

const DecisionMaker = () => {
  const [formData, setFormData] = useState({
    creditLimit: "",
    gender: "",
    educationLevel: "",
    maritalStatus: "",
    age: "",
  });

  const [taskType, setTaskType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim() === "" ? "" : parseFloat(value),
    });
  };

  // Handle Decision Analysis Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/decision_maker/", formData);
      setResult(response.data.recommended_action);
    } catch (err) {
      setError("Error getting decision. Please check your inputs.");
      console.error(err);
    }
  };

  // Handle AI Decision for Task Prioritization
  const handleDecision = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/ai-decision", { taskType, urgency });
      setResult(response.data.action);
    } catch (error) {
      setError("Error getting decision.");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md"><Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", marginTop: 5}}>
    🤖 AI Decision Maker
  </Typography>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, borderRadius: 3 }}>
        <Typography variant="body1" color="textSecondary" align="left" sx={{ marginBottom: 3 }}>
          Note: This tool helps in financial decision-making and task prioritization based on AI analysis.
        </Typography>

        {/* Financial Decision Analysis */}
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2, fontWeight: "bold" }}>
            Financial Decision Analysis
          </Typography>
          <TextField label="Credit Limit" fullWidth type="number" margin="normal" name="creditLimit" value={formData.creditLimit} onChange={handleChange} required />
          <TextField label="Gender (1: Male, 2: Female)" fullWidth type="number" margin="normal" name="gender" value={formData.gender} onChange={handleChange} required />
          <TextField label="Education Level (1-4)" fullWidth type="number" margin="normal" name="educationLevel" value={formData.educationLevel} onChange={handleChange} required />
          <TextField label="Marital Status (1: Single, 2: Married, 3: Others)" fullWidth type="number" margin="normal" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required />
          <TextField label="Age" fullWidth type="number" margin="normal" name="age" value={formData.age} onChange={handleChange} required />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button text="Analyze Decision" onClick={handleSubmit} />
          </Box>
        </form>

        {/* Task-Based AI Decision Making */}
        <Typography variant="h5" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
          AI Task Prioritization
        </Typography>
        <TextField select label="Task Category" fullWidth margin="normal" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          <MenuItem value="technical">Technical Task</MenuItem>
          <MenuItem value="administrative">Administrative Task</MenuItem>
          <MenuItem value="customer">Customer Service Task</MenuItem>
        </TextField>
        <TextField label="Urgency Level (1-10)" fullWidth type="number" margin="normal" value={urgency} onChange={(e) => setUrgency(e.target.value)} />
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button text="Get AI Decision" onClick={handleDecision} />
        </Box>

        {/* Display Results */}
        {result && <Typography variant="body1" sx={{ marginTop: 3, color: "green", fontWeight: "bold" }}>Recommended Action: {result}</Typography>}
        {error && <Typography variant="body1" sx={{ color: "red", marginTop: 2 }}>{error}</Typography>}
      </Paper>

      {/* Footer */}
      <Box sx={{ textAlign: "center", marginTop: 5, padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 Intellimation | Smart AI-Powered Decisions for Task Management
        </Typography>
      </Box>
    </Container>
  );
};

export default DecisionMaker;

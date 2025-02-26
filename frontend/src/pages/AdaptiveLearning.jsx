import React, { useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress, Box, Paper, Grid } from "@mui/material";
import axios from "axios";
import aiGif from "../assets/ailearning.gif"; // Ensure this file exists

const AdaptiveLearning = () => {
  const [inputData, setInputData] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  // Send data to backend for recommendation
  const getRecommendation = async () => {
    if (!inputData.trim()) {
      setError("🚨 Please enter valid data.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/adaptive-learning", {
        data: inputData,
      });

      setRecommendation(response.data.recommendation || "No recommendation generated.");
    } catch (error) {
      console.error("❌ Error getting recommendation:", error);
      setError("Failed to get recommendation. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      {/* Page Title */}
      <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
        📚 AI-Powered Adaptive Learning
      </Typography>

      <Typography variant="h6" sx={{ textAlign: "center", color: "gray", maxWidth: "800px", margin: "0 auto", mb: 4 }}>
        Enter data, and let our AI analyze patterns to provide smart recommendations that enhance automation.
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Left Side - AI GIF */}
        <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
          <img src={aiGif} alt="AI Learning" style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }} />
        </Grid>

        {/* Right Side - Form & Results */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: "10px", backgroundColor: "#fafafa" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              🔍 Input Data for AI Analysis
            </Typography>

            <TextField
              label="Enter Data"
              fullWidth
              variant="outlined"
              margin="normal"
              value={inputData}
              onChange={handleChange}
              sx={{ backgroundColor: "white" }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={getRecommendation}
              sx={{ mt: 2, fontSize: "16px", py: 1.5 }}
              disabled={loading}
            >
              🚀 Get AI Recommendation
            </Button>

            {loading && <CircularProgress sx={{ display: "block", mt: 2, mx: "auto" }} />}

            {error && (
              <Typography color="error" sx={{ mt: 3, p: 2, backgroundColor: "#ffdddd", borderRadius: "5px", textAlign: "center" }}>
                ❌ {error}
              </Typography>
            )}

            {recommendation && (
              <Paper elevation={3} sx={{ mt: 4, p: 3, backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
                  📊 AI Recommendation:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "16px", color: "#333", textAlign: "center" }}>
                  {recommendation}
                </Typography>
              </Paper>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdaptiveLearning;

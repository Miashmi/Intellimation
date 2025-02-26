import React, { useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress, Box, Paper } from "@mui/material";
import axios from "axios";

const AutoCodeDoc = () => {
  const [codeSnippet, setCodeSnippet] = useState("");
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle text change
  const handleChange = (e) => {
    setCodeSnippet(e.target.value);
  };

  // Send code snippet to backend for documentation
  const generateDocumentation = async () => {
    if (!codeSnippet.trim()) {
      setError("🚨 Please enter a code snippet.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate_docs/",
        { code_snippet: codeSnippet.trim() },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ API Response:", response.data);

      if (response.status === 200 && response.data.documentation) {
        setGeneratedDoc(response.data.documentation);
      } else {
        setError("🚨 No documentation generated. Please check your input.");
      }
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);

      if (error.response?.status === 422) {
        setError("🚨 Invalid input. Please enter a valid code snippet.");
      } else {
        setError("🚨 Failed to generate documentation. Please check your input and try again.");
      }
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      {/* Page Header */}
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mt: 4 }}>
        📝 Auto-Code Documentation
      </Typography>

      {/* Page Description */}
      <Typography variant="body1" sx={{ mb: 3, textAlign: "center", color: "#555" }}>
        This tool automatically generates documentation for your code snippets. Just paste your code below, 
        click "Generate Documentation," and get a well-structured explanation instantly!
      </Typography>

      {/* Code Input Box */}
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#fafafa", borderRadius: 2 }}>
        <TextField
          label="Paste your code snippet here"
          multiline
          fullWidth
          rows={20}  // Increased height for better readability
          variant="outlined"
          margin="normal"
          value={codeSnippet}
          onChange={handleChange}
          placeholder="e.g. def add(a, b): return a + b"
          sx={{ fontSize: "16px", backgroundColor: "#fff", borderRadius: "5px" }}
        />
      </Paper>

      {/* Generate Documentation Button */}
      <Box textAlign="center" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={generateDocumentation}
          sx={{ width: "50%", fontSize: "16px", fontWeight: "bold" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Documentation"}
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      {/* Display Generated Documentation */}
      {generatedDoc && (
        <Paper elevation={3} sx={{ mt: 4, p: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            📜 Generated Documentation:
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", color: "#333", fontSize: "14px" }}
          >
            {generatedDoc}
          </Typography>
        </Paper>
      )}
      <Box sx={{ textAlign: "center", marginTop: 5, padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="body2" color="textSecondary">
                © 2025 Intellimation | Smart AI-Powered Decisions for Task Management
              </Typography>
            </Box>
    </Container>
  );
};

export default AutoCodeDoc;

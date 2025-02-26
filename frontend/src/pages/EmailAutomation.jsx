import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid, Paper, Box } from "@mui/material";
import axios from "axios";
import emailGif from "../assets/emails.gif"; // Ensure this exists

const EmailAutomation = () => {
  const [emailData, setEmailData] = useState({ to: "", subject: "", message: "" });
  const [sentiment, setSentiment] = useState("");
  const [confidence, setConfidence] = useState("");
  const [textToAnalyze, setTextToAnalyze] = useState("");
  const [pastedSentiment, setPastedSentiment] = useState("");
  const [pastedConfidence, setPastedConfidence] = useState("");

  // Handle email input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });

    // Perform sentiment analysis while typing in email
    if (name === "message") {
      analyzeSentiment(value, "email");
    }
  };

  // Send Email Function
  const sendEmail = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/send-email", emailData);
      alert("✅ Email sent successfully!");
    } catch (error) {
      console.error("❌ Error sending email:", error);
      alert("❌ Failed to send email.");
    }
  };

  // Sentiment Analysis Function
  const analyzeSentiment = async (text, type) => {
    if (!text.trim()) return;
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze-email", { email: text });

      // Set correct state based on type
      if (type === "email") {
        setSentiment(response.data.sentiment || "Unknown");
        setConfidence(response.data.confidence ? `${(response.data.confidence * 100).toFixed(2)}%` : "N/A");
      } else {
        setPastedSentiment(response.data.sentiment || "Unknown");
        setPastedConfidence(response.data.confidence ? `${(response.data.confidence * 100).toFixed(2)}%` : "N/A");
      }
    } catch (error) {
      console.error("❌ Error analyzing sentiment:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
        ✉️ Send Your Email Now
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Left Side - GIF */}
        <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
          <img src={emailGif} alt="Email Automation" style={{ width: "100%", maxWidth: "700px" }} />
        </Grid>

        {/* Right Side - Email Form */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              📬 Compose Your Email
            </Typography>
            <TextField label="To" name="to" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Subject" name="subject" fullWidth margin="normal" onChange={handleChange} />
            <TextField
              label="Message"
              name="message"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              onChange={handleChange}
            />
            {sentiment && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                <b>📊 Email Sentiment:</b> {sentiment} (Confidence: {confidence})
              </Typography>
            )}
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={sendEmail}>
              🚀 Send Email
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Section: Check Sentiment of Pasted Text */}
      <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          🔍 Check Sentiment of Any Text
        </Typography>
        <TextField
          label="Paste text here"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={textToAnalyze}
          onChange={(e) => setTextToAnalyze(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => analyzeSentiment(textToAnalyze, "pasted")}
        >
          🔬 Analyze Sentiment
        </Button>
        {pastedSentiment && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <b>📝 Text Sentiment:</b> {pastedSentiment} (Confidence: {pastedConfidence})
          </Typography>
        )}
      </Paper>

      {/* Internal Footer */}
      <Box sx={{ textAlign: "center", marginTop: 5, padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 Intellimation | Smart AI-Powered Decisions for Task Management
        </Typography>
      </Box>
    </Container>
  );
};

export default EmailAutomation;

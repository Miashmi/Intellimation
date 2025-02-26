import React, { useState } from "react";
import { Button, Container, Typography, CircularProgress, Box, Paper } from "@mui/material";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import micGif from "../assets/mic.gif"; // Ensure this file exists
import recordingWave from "../assets/recordingwave.gif"; // Add a recording wave animation GIF

const VoiceToAction = () => {
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { startRecording, stopRecording, mediaBlobUrl, status } = useReactMediaRecorder({
    audio: true,
  });

  // Process voice command
  const processVoiceCommand = async () => {
    if (!mediaBlobUrl) {
      setError("Please record a voice command first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("📡 Fetching recorded audio...");
      const response = await fetch(mediaBlobUrl);
      const audioBlob = await response.blob();

      if (!audioBlob.size) {
        throw new Error("Audio file is empty. Try recording again.");
      }

      // Convert WebM to WAV
      const audioFile = new File([audioBlob], "voice_command.wav", { type: "audio/wav" });

      console.log("✅ Audio fetched. Preparing to send...");
      const formData = new FormData();
      formData.append("file", audioFile);

      console.log("📡 Sending audio to backend...");
      const res = await axios.post("http://127.0.0.1:8000/process_voice/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ API Response:", res.data);
      setTranscription(res.data.text || "No transcription available.");
    } catch (error) {
      console.error("❌ Error processing voice command:", error);
      setError(error.response?.data?.detail || "Failed to process voice command. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Page Title */}
      <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
        🎙 Voice-to-Action Automation
      </Typography>

      <Typography variant="h6" sx={{ textAlign: "center", color: "gray", maxWidth: "700px", mb: 4 }}>
        Speak your command, and let AI process it into actionable results. Record, listen, and execute voice-based actions seamlessly!
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center" gap={6} sx={{ width: "100%" }}>
        {/* Left Side - Mic GIF & Info */}
        <Box sx={{ textAlign: "center", maxWidth: "300px" }}>
          <img src={micGif} alt="Mic" style={{ width: "100%" }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
            Speak, Record & Execute
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Our AI-powered system transforms your voice into meaningful actions.
          </Typography>
        </Box>

        {/* Right Side - Control Panel */}
        <Paper elevation={3} sx={{ p: 4, width: "60%", textAlign: "center", backgroundColor: "#fafafa", borderRadius: "10px" }}>
          {/* Recording Status */}
          {status === "recording" && (
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography sx={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                🎤 Recording... (Speak Now)
              </Typography>
              <img src={recordingWave} alt="Recording Wave" style={{ width: "200px", marginTop: "10px" }} />
            </Box>
          )}

          {/* Buttons: Start, Stop, Process */}
          <Box display="flex" justifyContent="center" gap={2} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={startRecording}
              disabled={status === "recording"}
              sx={{ fontSize: "16px", px: 3 }}
            >
              🎙 Start Recording
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={stopRecording}
              disabled={status !== "recording"}
              sx={{ fontSize: "16px", px: 3 }}
            >
              ⏹ Stop Recording
            </Button>
          </Box>

          {/* Audio Preview */}
          {mediaBlobUrl && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>🎧 Listen to your recording:</Typography>
              <audio controls src={mediaBlobUrl} style={{ width: "100%" }} />
            </Box>
          )}

          {/* Process Voice Command */}
          <Button
            variant="contained"
            color="success"
            onClick={processVoiceCommand}
            sx={{ mt: 3, width: "100%", fontSize: "16px", px: 3 }}
            disabled={loading || !mediaBlobUrl}
          >
            {loading ? <CircularProgress size={24} /> : "🚀 Process Voice Command"}
          </Button>
        </Paper>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mt: 3, textAlign: "center", p: 1, backgroundColor: "#ffdddd", borderRadius: "5px" }}>
          ❌ {typeof error === "string" ? error : "An unknown error occurred."}
        </Typography>
      )}

      {/* Transcription Result */}
      {transcription && (
        <Paper elevation={3} sx={{ mt: 4, p: 3, width: "70%", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            📝 Transcription Result:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "16px", fontFamily: "monospace", color: "#333" }}>
            {transcription}
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

export default VoiceToAction;

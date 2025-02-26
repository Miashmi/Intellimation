import React, { useState } from "react";
import { Container, TextField, Typography, Box, Card, CardContent, LinearProgress, Alert, Grid } from "@mui/material";
import Button from "../components/Button";
import axios from "axios";

const WorkflowAnalytics = () => {
  const [tasks, setTasks] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("");
  const [workflowDelay, setWorkflowDelay] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredictDelay = async () => {
    const tasksInt = parseInt(tasks);
    const timeFloat = parseFloat(time);
    const priorityInt = parseInt(priority);

    if (isNaN(tasksInt) || isNaN(timeFloat) || isNaN(priorityInt)) {
      setWorkflowDelay("Please enter valid numerical values.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/predict_bottleneck/", {
        tasks_in_queue: tasksInt,
        avg_processing_time: timeFloat,
        priority_level: priorityInt,
      });

      setWorkflowDelay(response.data.bottleneck_detected ? "Workflow Delay Detected" : "No Delays Found");
    } catch (error) {
      console.error("Error:", error);
      setWorkflowDelay("Error predicting workflow delay.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mt: 4 }}>
        📇Workflow Analytics
      </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Analyze and predict workflow delays to optimize efficiency.
        </Typography>
      </Box>

      <Card sx={{ marginTop: 4, padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Number of Tasks"
                fullWidth
                margin="normal"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Average Processing Time (mins)"
                fullWidth
                margin="normal"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Priority Level (1-10)"
                fullWidth
                margin="normal"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                type="number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Button text="Predict Workflow Delay" onClick={handlePredictDelay} />
          </Box>

          {loading && <LinearProgress sx={{ marginTop: 2 }} />}

          {workflowDelay && (
            <Alert severity={workflowDelay.includes("Error") ? "error" : workflowDelay.includes("Detected") ? "warning" : "success"} sx={{ marginTop: 3 }}>
              {workflowDelay}
            </Alert>
          )}
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">
          <strong>Note:</strong> This tool helps predict workflow delays based on task queue, processing time, and priority levels. Use this insight to optimize resource allocation and improve efficiency.
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", marginTop: 5, padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 Intellimation | Smart AI-Powered Decisions for Task Management
        </Typography>
      </Box>
  
    </Container>
  );
};

export default WorkflowAnalytics;

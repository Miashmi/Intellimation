import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleSidebar}>
      <div style={{ width: 250, padding: "10px" }}>
        {/* Close Button */}
        <IconButton onClick={toggleSidebar} style={{ float: "right" }}>
          <CloseIcon />
        </IconButton>

        <List>
          <ListItem button component={Link} to="/email-automation" onClick={toggleSidebar}>
            <ListItemText primary="Email Automation" />
          </ListItem>
          <ListItem button component={Link} to="/workflow-analytics" onClick={toggleSidebar}>
            <ListItemText primary="Workflow Analytics" />
          </ListItem>
          <ListItem button component={Link} to="/decision-maker" onClick={toggleSidebar}>
            <ListItemText primary="Decision Maker" />
          </ListItem>
          <ListItem button component={Link} to="/auto-code-doc" onClick={toggleSidebar}>
            <ListItemText primary="Auto-Code Documentation" />
          </ListItem>
          <ListItem button component={Link} to="/voice-to-action" onClick={toggleSidebar}>
            <ListItemText primary="Voice-To-Action" />
          </ListItem>
          <ListItem button component={Link} to="/adaptive-learning" onClick={toggleSidebar}>
            <ListItemText primary="Adaptive Learning" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png"; // Ensure this path is correct

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          color: "black",
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          {/* Logo (Click to go to Home) */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Intellimation
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {/* Navigation Links */}
            <Button sx={navLinkStyle} onClick={() => handleNavigation("/home")}>
              <ScrollLink to="home" spy={true} smooth={true} duration={500} offset={-80} style={navLinkStyle}>
                Home
              </ScrollLink>
            </Button>
            <Button>
            <ScrollLink to="about" spy={true} smooth={true} duration={500} offset={-80} style={navLinkStyle}>
              About
            </ScrollLink></Button>
            <Button>
            <ScrollLink to="future" spy={true} smooth={true} duration={500} offset={-80} style={navLinkStyle}>
              Future
            </ScrollLink></Button>
            <Button>
            <ScrollLink to="faq" spy={true} smooth={true} duration={500} offset={-80} style={navLinkStyle}>
              FAQ
            </ScrollLink></Button>
          </Box>

          {/* Login Button & Sidebar Toggle */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
        
            <IconButton onClick={toggleSidebar} sx={{ ml: 2 }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

// Styling for navbar links
const navLinkStyle = {
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  color: "black",
};

export default Navbar;

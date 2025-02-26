import React from "react";
import { Box, Container, Typography, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import futureImage from "../assets/future.png";
import aboutGif from "../assets/about-image.png"; // Ensure this is the correct path

const Home = () => {
  return (
    <Box>
      {/* ✅ Section 1: Animated Background with Moving Quote */}
      <Box
        id="home"
        sx={{
          height: "100vh",
          marginLeft:"-300px",
          marginRight:"-300px",
          marginTop:"-100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #9AA6B2, #BCCCDC, #D9EAFD, #F8FAFC)",
          px: "5px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#333", // ✅ Dark Gray Text Color
            px: "5px",
            animation: "fadeInUp 2s ease-out, float 3s infinite ease-in-out",
          }}
        >
          "Intelligent Automation - The Future of Work!"
        </Typography>
      </Box>

      {/* ✅ Keyframe Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(50px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* ✅ Section 2: About */}
      <Container id="about" sx={{ py: 8, px: "5px" }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left - Image */}
          <Grid item xs={12} md={6}>
            <img src={aboutGif} alt="About" style={{ width: "100%", borderRadius: "10px" }} />
          </Grid>
          {/* Right - Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              About Our System
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", mb: 2, textAlign: "justify" }}>
              The **Intellimation AI System** is designed to revolutionize how businesses operate, bringing a new era of **efficiency, automation, and AI-driven decision-making**. Our system seamlessly integrates AI-powered automation to streamline workflows, eliminate redundancies, and ensure **optimized business processes**.
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", mb: 2, textAlign: "justify" }}>
              Unlike traditional automation tools, our platform **continuously learns and adapts** using machine learning algorithms. The more you use it, the **smarter it becomes**—optimizing workflows based on **real-time data**. Our **Adaptive Learning Model** ensures automation decisions are **accurate, efficient, and error-free**.
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", textAlign: "justify" }}>
              **Key Features:**
              - **Voice-to-Action AI**: Execute tasks in real-time using voice commands.
              - **Automated Email Handling**: AI-driven email filtering, drafting, and categorization.
              - **AI-Powered Decision Maker**: Intelligent recommendations based on data analysis.
              - **Workflow Optimization**: Predicts and prevents slowdowns **before they occur**.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* ✅ Section 3: Future Prospects */}
      <Container id="future" sx={{ py: 8, backgroundColor: "#f5f5f5", borderRadius: "10px", px: "5px" }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                    Coming Soon to You!
                  </Typography>
                  <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3, mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      AI-Powered Chatbot for Intelligent User Interaction
                    </Typography>
                    <Typography sx={{ textAlign: "justify" }}>Our advanced chatbot leverages Natural Language Processing (NLP)
                      to engage with users in a conversational manner, answering queries,
                      automating support tasks, and providing real-time assistance. This
                      chatbot continuously learns from interactions, improving response accuracy
                      and enhancing user experience over time.</Typography>
                  </Paper>
                  <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3, mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      UiPath Integration for Advanced Robotic Process Automation
                    </Typography>
                    <Typography sx={{ textAlign: "justify" }}>By integrating UiPath, our system will leverage enterprise-grade RPA
                      capabilities to automate repetitive tasks, streamline data extraction, and
                      improve process accuracy. This will enable end-to-end automation, reducing
                      manual effort and enhancing operational efficiency.</Typography>
                  </Paper>
                  <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      Enhanced Predictive Analytics to Optimize Workflow Further
                    </Typography>
                    <Typography sx={{ textAlign: "justify" }}>With improved AI-driven predictive analytics, businesses can
                      anticipate bottlenecks, identify optimization opportunities, and make proactive
                      decisions. The system will analyze workflow patterns to suggest actionable insights,
                      ensuring maximum productivity and efficiency.</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <img src={futureImage} alt="Future" style={{ width: "100%", borderRadius: "10px", marginTop: "20px" }} />
          </Grid>
        </Grid>
      </Container>

      {/* ✅ Section 4: FAQs */}
      <Container id="faq" sx={{ py: 8, px: "5px" }}>
        <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
          ❓ Frequently Asked Questions
        </Typography>

        {[
          { question: "1. What is Intelligent Automation?", answer: "AI-powered automation that enhances efficiency by reducing manual intervention." },
          { question: "2. How does AI help in automation?", answer: "It analyzes data, predicts patterns, automates repetitive tasks, and learns over time." },
          { question: "3. What industries benefit from this?", answer: "Finance, healthcare, IT, manufacturing, and retail sectors benefit significantly." },
          { question: "4. How does Adaptive Learning work?", answer: "It continuously improves automation based on **user feedback and real-time data**." },
          { question: "5. What future features will be added?", answer: "Advanced Voice AI, **Predictive Decision Making**, and **AI-powered Chatbots**." },
        ].map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
         <Box sx={{ textAlign: "center", marginTop: 5, padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 Intellimation | Smart AI-Powered Decisions for Task Management
        </Typography>
      </Box>
      </Container>
    </Box>
  );
};

export default Home;

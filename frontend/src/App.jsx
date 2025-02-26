import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";

import EmailAutomation from "./pages/EmailAutomation";
import WorkflowAnalytics from "./pages/WorkflowAnalytics";
import DecisionMaker from "./pages/DecisionMaker";
import AutoCodeDoc from "./pages/AutoCodeDoc";
import VoiceToAction from "./pages/VoiceToAction";
import AdaptiveLearning from "./pages/AdaptiveLearning";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/email-automation" element={<EmailAutomation />} />
            <Route path="/workflow-analytics" element={<WorkflowAnalytics />} />
            <Route path="/decision-maker" element={<DecisionMaker />} />
            <Route path="/auto-code-doc" element={<AutoCodeDoc />} />
            <Route path="/adaptive-learning" element={<AdaptiveLearning />} />
            <Route path="/voice-to-action" element={<VoiceToAction />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

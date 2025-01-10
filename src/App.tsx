import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard"; // Your dashboard component
import UserManagement from "./components/UserManagement"; // Example component
import Consultations from "./components/Consultations"; // Example component
import Content from "./components/Content";
import Settings from "./components/Settings";
import Subscriptions from "./components/Subscriptions";
import Support from "./components/Support";
import Analytics from "./components/Analytics";
import Compliance from "./components/Compliance";
import ClincalTesting from "./components/ClincalTesting";
import AiWorkflows from "./components/AiWorkflows";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<AdminDashboard />} />

        {/* Other Routes */}
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/Consultations" element={<Consultations />} />
        <Route path="/Content" element={<Content />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Subscriptions" element={<Subscriptions />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Compliance" element={<Compliance />} />
        <Route path="/ClincalTesting" element={<ClincalTesting />} />
        <Route path="/AiWorkflows" element={<AiWorkflows />} />
      </Routes>
    </Router>
  );
}

export default App;

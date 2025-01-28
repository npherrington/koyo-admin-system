import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard"; // Your dashboard component
import UserManagement from "./components/UserManagement"; // Example component
import AccountView from "./components/AccountView";
import Consultations from "./components/Consultations"; // Example component
import Content from "./components/Content";
import Settings from "./components/Settings";
import Subscriptions from "./components/Subscriptions";
import Support from "./components/Support";
import Analytics from "./components/Analytics";
import Compliance from "./components/Compliance";
import ClinicalTesting from "./components/ClinicalTesting";
import AiWorkflows from "./components/AiWorkflows";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRouting";
import Profile from "./components/Profile";
import ReviewConsultation from "./components/ReviewConsultation";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeLayout } from "./components/layouts/theme-layout";

function App() {
  return (
    <ThemeProvider>
      <ThemeLayout>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            {/* Private Routes */}
            <Route
              path="/Dashboard"
              element={<PrivateRoute element={<AdminDashboard />} />}
            />
            <Route
              path="/UserManagement"
              element={<PrivateRoute element={<UserManagement />} />}
            />
            <Route
              path="/UserManagement/AccountView/:id"
              element={<AccountView />}
            />
            <Route
              path="/Consultations"
              element={<PrivateRoute element={<Consultations />} />}
            />
            <Route
              path="/Content"
              element={<PrivateRoute element={<Content />} />}
            />
            <Route
              path="/Settings"
              element={<PrivateRoute element={<Settings />} />}
            />
            <Route
              path="/Subscriptions"
              element={<PrivateRoute element={<Subscriptions />} />}
            />
            <Route
              path="/Support"
              element={<PrivateRoute element={<Support />} />}
            />
            <Route
              path="/Analytics"
              element={<PrivateRoute element={<Analytics />} />}
            />
            <Route
              path="/Compliance"
              element={<PrivateRoute element={<Compliance />} />}
            />
            <Route
              path="/ClinicalTesting"
              element={<PrivateRoute element={<ClinicalTesting />} />}
            />
            <Route
              path="/AiWorkflows"
              element={<PrivateRoute element={<AiWorkflows />} />}
            />
            <Route
              path="/Profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route
              path="/ReviewConsultation"
              element={<PrivateRoute element={<ReviewConsultation />} />}
            />
            {/* Default route */}
            <Route path="/" element={<Navigate to="/signin" />} />
          </Routes>
        </Router>
      </ThemeLayout>
    </ThemeProvider>
  );
}

export default App;

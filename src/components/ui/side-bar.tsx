import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Users,
  Activity,
  MessageSquare,
  CreditCard,
  FileText,
  BarChart2,
  Headphones,
  Shield,
  Settings,
  BadgeCheck,
  Cpu,
  PersonStandingIcon,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: Activity,
    label: "Dashboard",
    id: "dashboard",
    path: "/Dashboard",
  },
  {
    icon: Users,
    label: "User Management",
    id: "users",
    path: "/UserManagement",
  },
  {
    icon: MessageSquare,
    label: "Consultations",
    id: "consultations",
    path: "/Consultations",
  },
  {
    icon: BarChart2,
    label: "Analytics",
    id: "analytics",
    path: "/Analytics",
  },
  {
    icon: BadgeCheck,
    label: "Clinical Testing",
    id: "testing",
    path: "/ClinicalTesting",
  },
  {
    icon: Cpu,
    label: "AI Workflows",
    id: "ai",
    path: "/AiWorkflows",
  },
  { icon: FileText, label: "Content", id: "content", path: "/Content" },
  {
    icon: CreditCard,
    label: "Subscriptions",
    id: "subscriptions",
    path: "/Subscriptions",
  },
  {
    icon: Shield,
    label: "Compliance",
    id: "compliance",
    path: "/Compliance",
  },
  { icon: Headphones, label: "Support", id: "support", path: "/Support" },
  {
    icon: PersonStandingIcon,
    label: "Profile",
    id: "profile",
    path: "/Profile",
  },
  { icon: Settings, label: "Settings", id: "settings", path: "/Settings" },
];

const Sidebar = ({ activeSection }: { activeSection: string }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      {activeSection !== "Dashboard" && (
        <div className="relative">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-0 z-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
          <div className="flex items-start justify-start h-12 px-0">
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "-ml-2 px-2 rounded-lg",
                isDarkMode
                  ? "hover:bg-slate-700 bg-slate-800 text-slate-200"
                  : "hover:bg-gray-100 bg-white text-gray-600"
              )}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {activeSection === "Dashboard" && (
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center w-full p-2 rounded-lg",
                    activeSection === item.label
                      ? "bg-orange-100 text-orange-600"
                      : isDarkMode
                      ? "text-slate-200 hover:bg-slate-700"
                      : "text-slate-900 hover:bg-gray-100"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3",
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    )}
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {activeSection !== "Dashboard" && (
        <nav
          className={cn(
            "fixed top-0 left-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300",
            isDarkMode ? "bg-slate-800" : "bg-white",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-end h-12 px-4">
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "px-2 rounded-lg",
                isDarkMode
                  ? "hover:bg-slate-700 bg-slate-800 text-slate-200"
                  : "hover:bg-gray-100 bg-white text-gray-600"
              )}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
          <ul className="fixed top-10 left-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center w-full p-2 rounded-lg",
                    activeSection === item.label
                      ? "bg-orange-100 text-orange-600"
                      : isDarkMode
                      ? "text-slate-200 hover:bg-slate-700"
                      : "text-slate-900 hover:bg-gray-100"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3",
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    )}
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;

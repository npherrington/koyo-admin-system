import React, { useState } from "react";
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
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

const menuItems = [
  {
    icon: Activity,
    label: "Dashboard",
    id: "dashboard",
    path: "/dashboard",
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
    icon: CreditCard,
    label: "Subscriptions",
    id: "subscriptions",
    path: "/Subscriptions",
  },
  { icon: FileText, label: "Content", id: "content", path: "/Content" },
  {
    icon: BarChart2,
    label: "Analytics",
    id: "analytics",
    path: "/Analytics",
  },
  { icon: Headphones, label: "Support", id: "support", path: "/Support" },
  {
    icon: Shield,
    label: "Compliance",
    id: "compliance",
    path: "/Compliance",
  },
  { icon: Settings, label: "Settings", id: "settings", path: "/Settings" },
  {
    icon: BadgeCheck,
    label: "Clincal Testing",
    id: "testing",
    path: "/ClincalTesting",
  },
  {
    icon: Cpu,
    label: "AI Workflows",
    id: "ai",
    path: "/AiWorkflows",
  },
];
const Sidebar = ({ activeSection }: { activeSection: string }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the route
  };

  return (
    <div>
      {/* Navigation */}
      {activeSection !== "Dashboard" && (
        <div className="relative">
          {/* Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-0 z-40"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar when overlay is clicked
            ></div>
          )}
          <div className="flex items-start justify-start h-12 px-0">
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={"-ml-2 px-2 rounded-lg hover:bg-gray-100 bg-white"}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </Button>
          </div>
        </div>
      )}

      {activeSection == "Dashboard" && (
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeSection === item.label
                      ? "bg-orange-100 text-orange-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {activeSection !== "Dashboard" && (
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end h-12 px-4">
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={"px-2 rounded-lg hover:bg-gray-100 bg-white"}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </Button>
          </div>
          <ul className="fixed top-10 left-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeSection === item.label
                      ? "bg-orange-100 text-orange-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
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

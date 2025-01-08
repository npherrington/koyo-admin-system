import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Shield,
  UserPlus,
  Settings,
  Save,
  CreditCard,
  MessageSquare,
  FileText,
  BarChart2,
  Headphones,
  Activity,
  BadgeCheck,
  Cpu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";

const UserSettingsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("settings");

  const handleNavigation = (id: string, path?: string) => {
    setActiveSection(id);
    if (path) {
      navigate(path);
    }
  };
  const menuItems = [
    {
      icon: Activity,
      label: "Dashboard",
      id: "dashboard",
      path: "/",
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
      label: "Quality Assurance",
      id: "qa",
      path: "/QualityAssurance",
    },
    {
      icon: Cpu,
      label: "AI Workflows",
      id: "ai",
      path: "/AiWorkflows",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("doctor-settings");
  const [autoApproveVerified, setAutoApproveVerified] = useState(true);
  const [maxFamilyMembers, setMaxFamilyMembers] = useState("5");
  const [maxConsultations, setMaxConsultations] = useState("2");
  const [ratingThreshold, setRatingThreshold] = useState("1");

  const handleSaveSettings = () => {
    console.log("Saving settings...");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="relative">
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-0 z-40"
            onClick={() => setIsSidebarOpen(false)} // Close sidebar when overlay is clicked
          ></div>
        )}
        <div className="flex justify-end items-center px-4 py-2">
          <Button
            className="text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-bg-gray-100 bg-gray-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            Menu
          </Button>
        </div>
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="fixed top-10 left-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id, item.path)}
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeSection === item.id
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
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            User Management Settings
          </h1>
          <p className="text-gray-500">
            Configure doctor and patient management preferences
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="border-b bg-slate-50">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="doctor-settings" className="w-full">
              <TabsList className="bg-indigo-50 text-black-300">
                <TabsTrigger
                  value="doctor-settings"
                  onClick={() => setSelectedTab("doctor-settings")}
                >
                  Doctor Management
                </TabsTrigger>
                <TabsTrigger
                  value="patient-settings"
                  onClick={() => setSelectedTab("patient-settings")}
                >
                  Patient Management
                </TabsTrigger>
                <TabsTrigger
                  value="subscription-rules"
                  onClick={() => setSelectedTab("subscription-rules")}
                >
                  Subscription Rules
                </TabsTrigger>
                <TabsTrigger
                  value="team-management"
                  onClick={() => setSelectedTab("team-management")}
                >
                  Team Management
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Doctor Management Settings */}
          {selectedTab === "doctor-settings" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Doctor Onboarding</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        Auto-approve Verified Doctors
                      </p>
                      <p className="text-sm text-gray-500">
                        Automatically approve doctors with verified credentials
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={autoApproveVerified}
                        onChange={(e) =>
                          setAutoApproveVerified(e.target.checked)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Active Consultations per Doctor
                    </label>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={maxConsultations}
                      onChange={(e) => setMaxConsultations(e.target.value)}
                    >
                      <option value="1">1 consultation</option>
                      <option value="2">2 consultations</option>
                      <option value="3">3 consultations</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Required Verification Documents
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Medical License</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Government ID</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">
                          Professional Certifications
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Quality Control</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Minimum Rating Threshold for Auto-blocking
                        </label>
                        <select
                          className="w-full p-2 border rounded-lg"
                          value={ratingThreshold}
                          onChange={(e) => setRatingThreshold(e.target.value)}
                        >
                          <option value="1">1 star</option>
                          <option value="2">2 stars</option>
                          <option value="3">3 stars</option>
                        </select>
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">
                          Auto-suspend after 3 patient complaints
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Patient Management Settings */}
          {selectedTab === "patient-settings" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Patient Account Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Family Members per Account
                    </label>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={maxFamilyMembers}
                      onChange={(e) => setMaxFamilyMembers(e.target.value)}
                    >
                      <option value="3">3 members</option>
                      <option value="5">5 members</option>
                      <option value="10">10 members</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Account Restrictions</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Block repeat no-shows</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">
                          Require phone verification
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">
                          Allow multiple active consultations
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Medical History Requirements
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Allergies</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Current Medications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Pre-existing Conditions</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Management */}
          {selectedTab === "team-management" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Team Members</h3>
                <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Team Member
                </button>
              </div>

              <div className="space-y-4">
                {/* Current Team Members */}
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      <tr>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <span className="text-orange-600 font-medium">
                                TC
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium">Tom Cracknell</div>
                              <div className="text-sm text-gray-500">
                                Last active: 2m ago
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          tom@koyohealthtech.com
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                            Super Admin
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-orange-600">
                          <button className="hover:text-orange-700">
                            Manage Access
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <span className="text-orange-600 font-medium">
                                TO
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium">Tunde Olotu</div>
                              <div className="text-sm text-gray-500">
                                Last active: 15m ago
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          tunde@koyohealthtech.com
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            Admin
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-orange-600">
                          <button className="hover:text-orange-700">
                            Manage Access
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <span className="text-orange-600 font-medium">
                                SA
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium">Sarah Ahmed</div>
                              <div className="text-sm text-gray-500">
                                Last active: 1h ago
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          sarah@koyohealthtech.com
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Agent
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-orange-600">
                          <button className="hover:text-orange-700">
                            Manage Access
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Role Permissions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Role Permissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Super Admin
                        </h4>
                        <div className="space-y-2 text-sm text-gray-500">
                          <p>• Full system access and configuration</p>
                          <p>• Manage team members and roles</p>
                          <p>• Access all analytics and reports</p>
                          <p>• Configure system settings</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Admin</h4>
                        <div className="space-y-2 text-sm text-gray-500">
                          <p>• Manage doctors and patients</p>
                          <p>• View analytics and reports</p>
                          <p>• Handle support tickets</p>
                          <p>• Manage content and resources</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Agent</h4>
                        <div className="space-y-2 text-sm text-gray-500">
                          <p>• Handle support tickets</p>
                          <p>• View basic analytics</p>
                          <p>• Manage content</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Subscription Rules */}
          {selectedTab === "subscription-rules" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Subscription Controls
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Basic Plan Rules</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Monthly Consultations
                        </span>
                        <input
                          type="number"
                          className="w-20 p-1 border rounded"
                          defaultValue="1"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Annual Discount (%)
                        </span>
                        <input
                          type="number"
                          className="w-20 p-1 border rounded"
                          defaultValue="25"
                        />
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">
                          Allow rollover of unused consultations
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Premium Plan Rules</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Monthly Consultations
                        </span>
                        <input
                          type="number"
                          className="w-20 p-1 border rounded"
                          defaultValue="10"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Annual Discount (%)
                        </span>
                        <input
                          type="number"
                          className="w-20 p-1 border rounded"
                          defaultValue="25"
                        />
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">
                          Priority doctor assignment
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Referral Program</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Free Consultations for Referral
                        </span>
                        <input
                          type="number"
                          className="w-20 p-1 border rounded"
                          defaultValue="1"
                        />
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-orange-600 mr-2"
                          defaultChecked
                        />
                        <span className="text-sm">Allow referral stacking</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettingsDashboard;

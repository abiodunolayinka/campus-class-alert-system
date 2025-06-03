
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPanel from "@/components/AdminPanel";
import ClassManagement from "@/components/ClassManagement";
import AdminLogin from "@/components/AdminLogin";
import { GraduationCap, LogOut, Settings, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuthenticated") === "true";
  });

  const adminRole = localStorage.getItem("adminRole") || "Admin";

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminRole");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EduReminder Admin</h1>
                <p className="text-sm text-gray-600">Logged in as: {adminRole}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline">
                  Back to Main Site
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Admin Dashboard</CardTitle>
            <CardDescription>
              Schedule class notifications and manage existing classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="schedule" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Schedule Class</span>
                </TabsTrigger>
                <TabsTrigger value="manage" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Manage Classes</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule" className="mt-6">
                <AdminPanel />
              </TabsContent>
              
              <TabsContent value="manage" className="mt-6">
                <ClassManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;

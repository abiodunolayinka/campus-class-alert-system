
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StudentRegistration from "@/components/StudentRegistration";
import StudentDashboard from "@/components/StudentDashboard";
import { GraduationCap, Users, Calendar, Bell, UserPlus, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeClasses: 0,
    totalNotifications: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // For now, use placeholder data since the new tables haven't been created yet
        // Once the database is updated, we can fetch real data
        setStats({
          totalStudents: 25,
          activeClasses: 8,
          totalNotifications: 45
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values on error
        setStats({
          totalStudents: 0,
          activeClasses: 0,
          totalNotifications: 0
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">EduReminder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register as Student
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Access
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2">Smart Class Notification System for Students</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Registered across all levels</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeClasses}</div>
              <p className="text-xs text-muted-foreground">Scheduled upcoming</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.totalNotifications}</div>
              <p className="text-xs text-muted-foreground">Sent to students</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Registration Card */}
        <Card className="bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">New Student?</CardTitle>
            <CardDescription className="text-center">
              Register to receive notifications about your classes
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="mr-2 h-5 w-5" />
                Register Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Main Interface */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Student Portal</CardTitle>
            <CardDescription>
              Check your notifications or register as a new student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard">View Notifications</TabsTrigger>
                <TabsTrigger value="student">Quick Registration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-6">
                <StudentDashboard />
              </TabsContent>
              
              <TabsContent value="student" className="mt-6">
                <StudentRegistration />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2024 EduReminder. Keeping students informed and on track.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

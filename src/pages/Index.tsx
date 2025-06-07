
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StudentRegistration from "@/components/StudentRegistration";
import StudentDashboard from "@/components/StudentDashboard";
import { GraduationCap, Users, Calendar, Bell, UserPlus, Settings, Shield } from "lucide-react";
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
        const { data: students } = await supabase
          .from('students')
          .select('id');
        
        const { data: classes } = await supabase
          .from('email_notifications')
          .select('id');

        setStats({
          totalStudents: students?.length || 0,
          activeClasses: 8,
          totalNotifications: classes?.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
          <div className="flex flex-col xs:flex-row items-center justify-between space-y-2 xs:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">EduReminder</h1>
            </div>
            <div className="flex flex-col xs:flex-row items-center space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-4">
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                  <UserPlus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Register as Student
                </Button>
              </Link>
              <Link to="/admin-signup">
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                  <Shield className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Admin Signup
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                  <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">Smart Class Notification System for Students</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Students</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Registered across all levels</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Active Classes</CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.activeClasses}</div>
              <p className="text-xs text-muted-foreground">Scheduled upcoming</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">{stats.totalNotifications}</div>
              <p className="text-xs text-muted-foreground">Sent to students</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Registration Card */}
        <Card className="bg-white/90 backdrop-blur-sm mb-4 sm:mb-8">
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl text-center">New Student?</CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm">
              Register to receive notifications about your classes
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center px-3 sm:px-6 pb-3 sm:pb-6">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm h-8 sm:h-12 px-4 sm:px-6">
                <UserPlus className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
                Register Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Main Interface */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">Student Portal</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Check your notifications or register as a new student
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-8 sm:h-10">
                <TabsTrigger value="dashboard" className="text-xs sm:text-sm">View Notifications</TabsTrigger>
                <TabsTrigger value="student" className="text-xs sm:text-sm">Quick Registration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-3 sm:mt-6">
                <StudentDashboard />
              </TabsContent>
              
              <TabsContent value="student" className="mt-3 sm:mt-6">
                <StudentRegistration />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            © 2024 EduReminder. Keeping students informed and on track.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

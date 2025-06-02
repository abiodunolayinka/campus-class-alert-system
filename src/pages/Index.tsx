
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentRegistration from "@/components/StudentRegistration";
import AdminPanel from "@/components/AdminPanel";
import StudentDashboard from "@/components/StudentDashboard";
import { GraduationCap, Users, Calendar, Bell } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">EduReminder</h1>
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
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <p className="text-xs text-muted-foreground">Registered across all levels</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28</div>
              <p className="text-xs text-muted-foreground">Scheduled this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">156</div>
              <p className="text-xs text-muted-foreground">Sent today</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Student Reminder System</CardTitle>
            <CardDescription>
              Register as a student or access the admin panel to manage class notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student Registration</TabsTrigger>
                <TabsTrigger value="dashboard">Student Dashboard</TabsTrigger>
                <TabsTrigger value="admin">Admin Panel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="mt-6">
                <StudentRegistration />
              </TabsContent>
              
              <TabsContent value="dashboard" className="mt-6">
                <StudentDashboard />
              </TabsContent>
              
              <TabsContent value="admin" className="mt-6">
                <AdminPanel />
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

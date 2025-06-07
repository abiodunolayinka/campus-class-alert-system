
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, User, Mail, Phone, GraduationCap, Bell, Search } from "lucide-react";
import EmptyState from "./EmptyState";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: string;
  department: string;
  notificationPreference: string;
  registrationDate: string;
}

interface ClassNotification {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  targetLevel: string;
  department: string;
  createdAt: string;
  studentsNotified: number;
}

const StudentDashboard = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [notifications, setNotifications] = useState<ClassNotification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<ClassNotification[]>([]);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    // Load classes from localStorage
    const savedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    setNotifications(savedClasses);
  }, []);

  useEffect(() => {
    if (studentData) {
      // Filter notifications based on student's level and department
      const filtered = notifications.filter(notification => {
        const levelMatch = !notification.targetLevel || notification.targetLevel === studentData.level;
        const deptMatch = !notification.department || notification.department === "All Departments" || notification.department === studentData.department;
        return levelMatch && deptMatch;
      });
      setFilteredNotifications(filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [studentData, notifications]);

  const searchStudent = () => {
    setSearchError("");
    
    if (!searchEmail.trim()) {
      setSearchError("Please enter an email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(searchEmail)) {
      setSearchError("Please enter a valid email address");
      return;
    }

    const students = JSON.parse(localStorage.getItem("students") || "[]");
    const found = students.find((student: Student) => student.email.toLowerCase() === searchEmail.toLowerCase());
    
    if (!found) {
      setSearchError(`No student found with email "${searchEmail}"`);
      setStudentData(null);
    } else {
      setStudentData(found);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (date: string, time: string) => {
    const classDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    
    if (classDateTime < now) {
      return "bg-gray-100 text-gray-600";
    } else if (classDateTime.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
      return "bg-red-100 text-red-600";
    } else {
      return "bg-green-100 text-green-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-blue-600" />
            <span>Student Dashboard</span>
          </CardTitle>
          <CardDescription>
            Enter your email address to view your profile and class notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="sm:flex space-x-1 sm:space-x-4">
            <div className="flex-1">
              <Label htmlFor="search-email">Email Address</Label>
              <Input
                id="search-email"
                type="email"
                value={searchEmail}
                onChange={(e) => {
                  setSearchEmail(e.target.value);
                  setSearchError("");
                }}
                placeholder="Enter your registered email"
                className={`mt-1 ${searchError ? "border-red-500" : ""}`}
              />
              {searchError && (
                <p className="text-sm text-red-500 mt-1">{searchError}</p>
              )}
            </div>
            <Button onClick={searchStudent} className="mt-6">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {studentData && (
        <>
          {/* Student Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Student Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{studentData.firstName} {studentData.lastName}</span>
                    <Badge variant="secondary">{studentData.level} Level</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{studentData.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{studentData.phone}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="font-medium">Department:</span>
                    <p className="text-gray-600">{studentData.department}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Notification Preference:</span>
                    <p className="text-gray-600 capitalize">{studentData.notificationPreference}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Registered:</span>
                    <p className="text-gray-600">{formatDate(studentData.registrationDate)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span>Your Class Notifications</span>
                <Badge variant="outline">{filteredNotifications.length} notifications</Badge>
              </CardTitle>
              <CardDescription>
                Class schedules and announcements relevant to your level and department
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification, index) => (
                    <div key={notification.id}>
                      <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg">{notification.title}</h3>
                            <Badge className={getStatusColor(notification.date, notification.time)}>
                              {new Date(`${notification.date}T${notification.time}`) < new Date() ? "Past" : "Upcoming"}
                            </Badge>
                          </div>
                          
                          {notification.description && (
                            <p className="text-gray-600 mb-3">{notification.description}</p>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span>{formatDate(notification.date)}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-green-500" />
                              <span>{formatTime(notification.time)}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-red-500" />
                              <span>{notification.location}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                            <span>
                              Target: {notification.targetLevel ? `${notification.targetLevel} Level` : "All Levels"} 
                              {notification.department && notification.department !== "All Departments" && ` • ${notification.department}`}
                            </span>
                            <span>Sent: {new Date(notification.createdAt).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                      {index < filteredNotifications.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Bell}
                  title="No Notifications Yet"
                  description="You haven't received any class notifications for your level and department. Check back later for updates from your lecturers and administration!"
                />
              )}
            </CardContent>
          </Card>
        </>
      )}

      {!studentData && searchEmail && !searchError && (
        <EmptyState
          icon={User}
          title="Student Not Found"
          description={`No student found with the email address "${searchEmail}". Please check the email or register first.`}
        />
      )}
    </div>
  );
};

export default StudentDashboard;

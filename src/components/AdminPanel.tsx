
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, Send, Settings, Bell } from "lucide-react";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: string;
  department: string;
  notificationPreference: string;
}

const AdminPanel = () => {
  const [classData, setClassData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    targetLevel: "",
    department: "",
    notificationType: "all"
  });
  
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load students from localStorage
    const savedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(savedStudents);
  }, []);

  const departments = [
    "All Departments",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Business Administration",
    "Economics",
    "Psychology",
    "English Literature"
  ];

  const getFilteredStudents = () => {
    return students.filter(student => {
      const levelMatch = classData.targetLevel === "" || student.level === classData.targetLevel;
      const deptMatch = classData.department === "" || classData.department === "All Departments" || student.department === classData.department;
      return levelMatch && deptMatch;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const filteredStudents = getFilteredStudents();
    
    // Simulate sending notifications
    setTimeout(() => {
      console.log("Class notification data:", classData);
      console.log("Students to notify:", filteredStudents);

      // Save class notification to localStorage
      const existingClasses = JSON.parse(localStorage.getItem("classes") || "[]");
      const newClass = {
        ...classData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        studentsNotified: filteredStudents.length
      };
      existingClasses.push(newClass);
      localStorage.setItem("classes", JSON.stringify(existingClasses));

      toast({
        title: "Notification Sent Successfully!",
        description: `${filteredStudents.length} students have been notified about the class "${classData.title}".`,
      });

      // Reset form
      setClassData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        targetLevel: "",
        department: "",
        notificationType: "all"
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setClassData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-600" />
            <span>Admin Panel - Schedule Class Notification</span>
          </CardTitle>
          <CardDescription>
            Create and send notifications to students about upcoming classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Class Title</Label>
                <Input
                  id="title"
                  value={classData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Introduction to Algorithms"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={classData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., Lecture Hall 1, Room 205"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Class Description</Label>
              <Textarea
                id="description"
                value={classData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Provide details about the class content, requirements, or any special instructions..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={classData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="time"
                    type="time"
                    value={classData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Level</Label>
                <Select value={classData.targetLevel} onValueChange={(value) => handleInputChange("targetLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="100">100 Level</SelectItem>
                    <SelectItem value="200">200 Level</SelectItem>
                    <SelectItem value="300">300 Level</SelectItem>
                    <SelectItem value="400">400 Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={classData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Students to be notified:</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {getFilteredStudents().length} students
                </Badge>
              </div>
              <p className="text-sm text-blue-700">
                Based on your selection criteria, {getFilteredStudents().length} students will receive this notification.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Bell className="mr-2 h-4 w-4 animate-pulse" />
                  Sending Notifications...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Class Notification
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{students.length}</div>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{students.filter(s => s.level === "100").length}</div>
            <p className="text-sm text-gray-600">100 Level</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{students.filter(s => s.level === "200").length}</div>
            <p className="text-sm text-gray-600">200 Level</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{students.filter(s => s.level === "300").length + students.filter(s => s.level === "400").length}</div>
            <p className="text-sm text-gray-600">300-400 Level</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;

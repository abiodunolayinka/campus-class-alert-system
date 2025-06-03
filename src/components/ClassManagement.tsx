
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Trash2, Edit, Users } from "lucide-react";

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

const ClassManagement = () => {
  const [classes, setClasses] = useState<ClassNotification[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = () => {
    const savedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    setClasses(savedClasses.sort((a: ClassNotification, b: ClassNotification) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const deleteClass = (classId: number) => {
    const updatedClasses = classes.filter(cls => cls.id !== classId);
    localStorage.setItem("classes", JSON.stringify(updatedClasses));
    setClasses(updatedClasses);
    toast({
      title: "Class Deleted",
      description: "The scheduled class has been removed successfully.",
    });
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span>Manage Scheduled Classes</span>
          <Badge variant="outline">{classes.length} classes</Badge>
        </CardTitle>
        <CardDescription>
          View, edit, and delete scheduled class notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {classes.length > 0 ? (
          <div className="space-y-4">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{classItem.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(classItem.date, classItem.time)}>
                        {new Date(`${classItem.date}T${classItem.time}`) < new Date() ? "Past" : "Upcoming"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteClass(classItem.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {classItem.description && (
                    <p className="text-gray-600 mb-3">{classItem.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{formatDate(classItem.date)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>{formatTime(classItem.time)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span>{classItem.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>
                        Target: {classItem.targetLevel === "all" ? "All Levels" : `${classItem.targetLevel} Level`} 
                        {classItem.department && classItem.department !== "All Departments" && ` • ${classItem.department}`}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{classItem.studentsNotified} students notified</span>
                      </div>
                    </div>
                    <span>Created: {new Date(classItem.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Classes Scheduled</h3>
            <p className="text-gray-400">
              No classes have been scheduled yet. Use the form above to create your first class notification.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassManagement;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Mail, Phone, GraduationCap } from "lucide-react";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    level: "",
    department: "",
    notificationPreference: "email",
    emailNotifications: true,
    smsNotifications: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const departments = [
    { value: "computer-science", label: "Computer Science" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
    { value: "engineering", label: "Engineering" },
    { value: "business-administration", label: "Business Administration" },
    { value: "economics", label: "Economics" },
    { value: "psychology", label: "Psychology" },
    { value: "english-literature", label: "English Literature" }
  ];

  const levels = [
    { value: "100", label: "100 Level" },
    { value: "200", label: "200 Level" },
    { value: "300", label: "300 Level" },
    { value: "400", label: "400 Level" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            level: formData.level,
            department: formData.department,
            notification_preference: formData.notificationPreference,
            email_notifications: formData.emailNotifications,
            sms_notifications: formData.smsNotifications
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Registration Successful!",
        description: `Welcome ${formData.firstName}! You'll receive notifications for ${formData.level} level classes.`,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        level: "",
        department: "",
        notificationPreference: "email",
        emailNotifications: true,
        smsNotifications: false
      });
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error registering the student.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="h-5 w-5 text-blue-600" />
          <span>Student Registration</span>
        </CardTitle>
        <CardDescription>
          Register to receive notifications about your classes and important announcements
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="student@university.edu"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234 801 234 5678"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Academic Level</Label>
              <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Notification Preferences</Label>
            <RadioGroup
              value={formData.notificationPreference}
              onValueChange={(value) => handleInputChange("notificationPreference", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center sm:space-x-2">
                <RadioGroupItem value="email" id="email-pref" />
                <Label className="text-[10px]" htmlFor="email-pref">Email Only</Label>
              </div>
              <div className="flex items-center sm:space-x-2">
                <RadioGroupItem value="sms" id="sms-pref" />
                <Label className="text-[10px]" htmlFor="sms-pref">SMS Only</Label>
              </div>
              <div className="flex items-center sm:space-x-2">
                <RadioGroupItem value="both" id="both-pref" />
                <Label className="text-[10px]" htmlFor="both-pref">Both Email & SMS</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Additional Settings</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-notifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange("emailNotifications", checked as boolean)}
                />
                <Label htmlFor="email-notifications">Receive email notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms-notifications"
                  checked={formData.smsNotifications}
                  onCheckedChange={(checked) => handleInputChange("smsNotifications", checked as boolean)}
                />
                <Label htmlFor="sms-notifications">Receive SMS notifications</Label>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <GraduationCap className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Register Student
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentRegistration;

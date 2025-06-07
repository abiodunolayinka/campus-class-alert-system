
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, Phone, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.level) {
      newErrors.level = "Academic level is required";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Registration Failed",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert student data into Supabase
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          level: formData.level,
          department: formData.department,
          notification_preference: formData.notificationPreference,
          email_notifications: formData.emailNotifications,
          sms_notifications: formData.smsNotifications
        });

      if (studentError) throw studentError;

      // Send welcome email
      try {
        const response = await supabase.functions.invoke('send-welcome-email', {
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            userType: 'student'
          })
        });

        if (response.error) {
          console.log("Email sending failed:", response.error);
        }
      } catch (emailError) {
        console.log("Email sending failed:", emailError);
      }

      toast({
        title: "Registration Successful!",
        description: `Welcome ${formData.firstName}! You'll receive notifications for ${formData.level} level classes. Check your email for confirmation.`,
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
      setErrors({});
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="px-3 sm:px-6">
        <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
          <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          <span>Student Registration</span>
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Register to receive notifications about your classes and important announcements
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-xs sm:text-sm">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                className={`text-xs sm:text-sm h-8 sm:h-10 ${errors.firstName ? "border-red-500" : ""}`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-xs sm:text-sm">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                className={`text-xs sm:text-sm h-8 sm:h-10 ${errors.lastName ? "border-red-500" : ""}`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="student@university.edu"
                  className={`pl-8 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234 801 234 5678"
                  className={`pl-8 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10 ${errors.phone ? "border-red-500" : ""}`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm">Academic Level *</Label>
              <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                <SelectTrigger className={`text-xs sm:text-sm h-8 sm:h-10 ${errors.level ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level.value} value={level.value} className="text-xs sm:text-sm">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-xs text-red-500">{errors.level}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger className={`text-xs sm:text-sm h-8 sm:h-10 ${errors.department ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.value} value={dept.value} className="text-xs sm:text-sm">
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-xs text-red-500">{errors.department}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Label className="text-xs sm:text-sm">Notification Preferences</Label>
            <RadioGroup
              value={formData.notificationPreference}
              onValueChange={(value) => handleInputChange("notificationPreference", value)}
              className="flex flex-col xs:flex-row xs:space-x-4 space-y-2 xs:space-y-0"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email-pref" className="h-3 w-3 sm:h-4 sm:w-4" />
                <Label htmlFor="email-pref" className="text-xs sm:text-sm">Email Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms-pref" className="h-3 w-3 sm:h-4 sm:w-4" />
                <Label htmlFor="sms-pref" className="text-xs sm:text-sm">SMS Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both-pref" className="h-3 w-3 sm:h-4 sm:w-4" />
                <Label htmlFor="both-pref" className="text-xs sm:text-sm">Both Email & SMS</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Label className="text-xs sm:text-sm">Additional Settings</Label>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-notifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange("emailNotifications", checked as boolean)}
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
                <Label htmlFor="email-notifications" className="text-xs sm:text-sm">Receive email notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms-notifications"
                  checked={formData.smsNotifications}
                  onCheckedChange={(checked) => handleInputChange("smsNotifications", checked as boolean)}
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
                <Label htmlFor="sms-notifications" className="text-xs sm:text-sm">Receive SMS notifications</Label>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm h-8 sm:h-10" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <GraduationCap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <UserPlus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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

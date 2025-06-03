
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simple hardcoded credentials for demo - in real app, this would be secure authentication
  const adminCredentials = {
    classRep: { username: "classrep", password: "classrep123" },
    lecturer: { username: "lecturer", password: "lecturer123" }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const isValidAdmin = 
        (credentials.username === adminCredentials.classRep.username && credentials.password === adminCredentials.classRep.password) ||
        (credentials.username === adminCredentials.lecturer.username && credentials.password === adminCredentials.lecturer.password);

      if (isValidAdmin) {
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminRole", credentials.username === "classrep" ? "Class Representative" : "Lecturer");
        toast({
          title: "Login Successful!",
          description: `Welcome ${credentials.username === "classrep" ? "Class Representative" : "Lecturer"}!`,
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Only class representatives and lecturers have access.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Lock className="h-6 w-6 text-blue-600" />
            <span>Admin Access</span>
          </CardTitle>
          <CardDescription>
            Only class representatives and lecturers can access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Login as Admin"}
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 text-center">
              <strong>Demo Credentials:</strong><br/>
              Class Rep: classrep / classrep123<br/>
              Lecturer: lecturer / lecturer123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

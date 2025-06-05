
import StudentRegistration from "@/components/StudentRegistration";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StudentRegister = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="sm:flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center text-sm space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900 text-center">Student Registration</h1>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2">Register to receive class notifications</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudentRegistration />
      </main>
    </div>
  );
};

export default StudentRegister;

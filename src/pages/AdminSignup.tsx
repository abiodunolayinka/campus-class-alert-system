
import AdminSignup from "@/components/AdminSignup";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      {/* Header */}
      <header className="bg-white shadow-sm border-b mb-4 sm:mb-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">Admin Registration</h1>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">Create an admin account to manage the system</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
        <AdminSignup />
      </main>
    </div>
  );
};

export default AdminSignupPage;

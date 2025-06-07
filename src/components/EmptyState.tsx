
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const EmptyState = ({ icon: Icon, title, description, className = "" }: EmptyStateProps) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="flex justify-center mb-4">
        <Icon className="h-16 w-16 text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;

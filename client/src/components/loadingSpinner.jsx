import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <Loader className="w-16 h-16 text-blue-600 animate-spin" />
      <p className="mt-4 text-lg font-bold tracking-wide text-gray-600">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;



import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
    <p className="text-gray-600">Loading books...</p>
  </div>
);
export default LoadingSpinner
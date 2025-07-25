

import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
    <div className="flex items-start">
      <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-red-800 font-medium mb-2">Error Loading Books</h3>
        <p className="text-red-700 mb-4">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  </div>
);
export default ErrorMessage

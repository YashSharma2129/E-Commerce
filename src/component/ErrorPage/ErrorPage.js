import React from "react";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-red-500 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-6">
          The page you are  looking for does nott exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="bg-red-500 text-white px-8 py-3 rounded-lg inline-block
            hover:bg-red-600 transition-colors duration-300 hover:shadow-lg
            font-semibold"
          >
            Back to Home
          </Link>
          <div className="text-gray-500 mt-4">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-red-500 hover:underline font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;

import React from "react";

const Dashboard = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}! 👋
          </h1>
          <p className="text-gray-600">
            Welcome to your dashboard. Have a great day!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

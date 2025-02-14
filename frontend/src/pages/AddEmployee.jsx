import React, { useState } from "react";
import { addEmployee } from "../services/api";
import { useAuthContext } from "../context/AuthContext";
import {useNavigate } from "react-router-dom";

const EmployeeRegistrationForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  if (user?.role === "Regular") {
    return navigate("/");
  }

  const positions = [
    { id: "sde1", title: "Software Development Engineer I" },
    { id: "sde2", title: "Software Development Engineer II" },
    { id: "sde3", title: "Software Development Engineer III" },
    { id: "sse", title: "Senior Software Engineer" },
    { id: "em", title: "Engineering Manager" },
    { id: "pm", title: "Product Manager" },
    { id: "designer", title: "UI/UX Designer" },
    { id: "qa", title: "Quality Assurance Engineer" },
    { id: "devops", title: "DevOps Engineer" },
    { id: "data", title: "Data Scientist" },
  ];

  const departments = [
    "Engineering",
    "Product",
    "Design",
    "Quality Assurance",
    "Operations",
    "Data Science",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    dateOfJoining: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        photo: reader.result, // Base64 encoded string
      });
    };

    if (file) {
      reader.readAsDataURL(file); // Converts file to Base64 string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.role === "Manager" && formData?.department !== user?.department) {
      alert(
        `You are a manager of ${user?.department}, can't change other department data`
      );
      return;
    }

    try {
      await addEmployee(formData); // Ensure the backend supports Base64-encoded image strings
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Employee Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter new employee details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john.doe@company.com"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select position</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Joining
            </label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Register Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;

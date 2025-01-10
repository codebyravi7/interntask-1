import React, { useState, useEffect } from "react";
import {
  deleteEmployee,
  updateEmployee,
  getEmployeeDetails,
} from "../services/api";
import { useNavigate } from "react-router-dom";
const EmployeeProfile = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeDetails(employeeId);
        setEmployee(data);
        setFormData(data);
      } catch (err) {
        setError("Failed to load employee data");
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleUpdate = async () => {
    try {
      const response = await updateEmployee(employeeId, formData);
      setEmployee(response);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to update employee");
      alert("you are not authorised to upadate");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeId);
      setIsDeleting(false);
      navigate("/");
    } catch (err) {
      setError("Failed to delete employee");
      alert("you are not authorised to delete");
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  // Delete Confirmation Modal
  const DeleteConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this employee profile? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsDeleting(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col items-center p-8 border-b border-gray-200">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          {employee.profilePicture ? (
            <img
              src={employee.profilePicture}
              alt={employee.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-semibold">
              {getInitials(employee.name)}
            </div>
          )}
        </div>

        {/* Name and Title */}
        <div className="mt-4 text-center">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded text-center"
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded text-center"
              />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800">
                {employee.name}
              </h2>
              <p className="text-gray-600">{employee.position}</p>
            </>
          )}
          <span
            className={`inline-block px-3 py-1 mt-2 text-sm rounded-full ${
              employee.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {employee.status}
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-2 py-1 border rounded text-sm"
                />
              ) : (
                <p className="text-sm font-medium text-gray-800">
                  {employee.email}
                </p>
              )}
            </div>
          </div>

          {/* Date of Joining */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 0v4M3 13h18M5 21h14a2 2 0 002-2v-6H3v6a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Joining</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(employee.dateOfJoining)}
              </p>
            </div>
          </div>

          {/* Department */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7l6 6m0 0l6-6m-6 6V4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-sm font-medium text-gray-800">
                {employee.department}
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg
                className="w-5 h-5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10l7-7m0 0l7 7M4 20h16a2 2 0 002-2V4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-800">
                {employee.phone}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-pink-50 rounded-lg">
              <svg
                className="w-5 h-5 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11c0 3.866-2.239 7-5 7s-5-3.134-5-7a5 5 0 1110 0zM12 22v.01"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-sm font-medium text-gray-800">
                {employee.address}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(employee);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsDeleting(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && <DeleteConfirmation />}
    </div>
  );
};

export default EmployeeProfile;

import React, { useState, useEffect } from "react";
import {
  deleteEmployee,
  updateEmployee,
  getEmployeeDetails,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { Mail, Calendar, Folder, Edit, Trash2 } from "lucide-react"; // Importing icons from lucide-react

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
      alert("You are not authorised to update");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeId);
      setIsDeleting(false);
      navigate("/");
    } catch (err) {
      setError("Failed to delete employee");
      alert("You are not authorised to delete");
      setIsDeleting(false);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
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
              <select
                name="position"
                value={formData.position}
                onChange={handleSelectChange}
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
              <Mail className="w-5 h-5 text-blue-500" />
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
              <Calendar className="w-5 h-5 text-green-500" />
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
              <Folder className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              {isEditing ? (
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleSelectChange}
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
              ) : (
                <p className="text-sm font-medium text-gray-800">
                  {employee.department}
                </p>
              )}
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
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                <Edit className="inline-block w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button
                onClick={() => setIsDeleting(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                <Trash2 className="inline-block w-4 h-4 mr-2" />
                Delete Profile
              </button>
            </>
          )}
        </div>
      </div>

      {isDeleting && <DeleteConfirmation />}
    </div>
  );
};

export default EmployeeProfile;

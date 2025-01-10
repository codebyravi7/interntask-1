import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { useNavigate } from "react-router-dom"; // Add this import

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleClick = (employeeId) => {
    navigate(`/profile/${employeeId}`);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      {employees.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="cursor-pointer hover:bg-gray-400"
                onClick={() => handleClick(employee._id)} // Corrected here
              >
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">{employee.email}</td>
                <td className="border border-gray-300 p-2">
                  {employee.position}
                </td>
                <td className="border border-gray-300 p-2">
                  {employee.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;

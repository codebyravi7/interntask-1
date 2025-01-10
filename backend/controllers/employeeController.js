import { AuditLog } from "../models/Auditlog.js";
import Employee from "../models/Employee.js";
import cloudinary from "../utils/cloudinary.js";

// Add Employee with Audit Log
export const addEmployee = async (req, res) => {
  const { name, email, position, department, dateOfJoining, photo } = req.body;
  
  try {
    let imageUrl;
    if (photo) {
      const uploadResponse = await cloudinary.uploader.upload(photo);
      imageUrl = uploadResponse.secure_url;
      // try {
      // } catch (err) {
      //   console.log("Error in the upload at cloudinary", err);
      // }
    }
    const newEmployee = new Employee({
      name,
      email,
      position,
      department,
      dateOfJoining,
      profilePicture: imageUrl,
    });
    await newEmployee.save();

    // Create an audit log for "CREATE" action
    const auditEntry = new AuditLog({
      userId: req.user.userId, // Assuming user is authenticated
      action: "CREATE",
      employeeId: newEmployee._id,
      changes: { after: newEmployee },
    });
    await auditEntry.save();

    res.status(201).json({ msg: "Employee added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error adding employee", error: error.message });
  }
};

// Update Employee with Audit Log
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ msg: "Employee not found" });

    const previousState = employee.toObject(); // Save previous state

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Create an audit log for "UPDATE" action
    const auditEntry = new AuditLog({
      userId: req.user.userId,
      action: "UPDATE",
      employeeId: id,
      changes: {
        before: previousState,
        after: updatedEmployee,
      },
    });
    await auditEntry.save();

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating employee", error: error.message });
  }
};

// Delete Employee with Audit Log
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ msg: "Employee not found" });

    const previousState = employee.toObject();

    await Employee.findByIdAndDelete(id);

    // Create an audit log for "DELETE" action
    const auditEntry = new AuditLog({
      userId: req.user.userId,
      action: "DELETE",
      employeeId: id,
      changes: { before: previousState },
    });
    await auditEntry.save();

    res.status(200).json({ msg: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting employee", error: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching employee", error: error.message });
  }
};
export const getEmployeeProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching employee", error: error.message });
  }
};

import {AuditLog} from "../models/Auditlog.js";

export const getAuditLogs = async (req, res) => {
  try {
    const { employeeId } = req.query; // Optional filter by employee
    const filters = employeeId ? { employeeId } : {};

    const logs = await AuditLog.find(filters)
      .populate("userId", "name email") // Include user details
      .populate("employeeId", "name position email") // Include employee details
      .sort({ timestamp: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching audit logs", error: error.message });
  }
};

export const deleteAuditLogs = async (req, res) => {
  try {
    await AuditLog.deleteMany(); // Clears all logs (optional for cleanup functionality)
    res.status(200).json({ msg: "Audit logs deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting audit logs", error: error.message });
  }
};

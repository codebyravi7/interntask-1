import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User making the action
  action: { type: String, required: true }, // CREATE, UPDATE, DELETE
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  }, // Employee being acted upon
  changes: { type: Object }, // Stores the details of changes (before and after values)
  timestamp: { type: Date, default: Date.now }, // Time of action
});
export const AuditLog = mongoose.model("AuditLog", auditLogSchema);

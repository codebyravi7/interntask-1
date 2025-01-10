import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  profilePicture: { type: String },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

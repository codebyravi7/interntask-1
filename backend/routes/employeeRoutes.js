import express from "express";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeProfile,
} from "../controllers/employeeController.js";
const router = express.Router();

// Protect routes using authMiddleware and roleMiddleware
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Manager",,"Regular"]),
  getEmployees
); // Only Admin and Manager can get employees
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Manager","Regular"]),
  getEmployeeProfile
); // Only Admin and Manager can get employees







router.post("/", authMiddleware, roleMiddleware(["Admin", "Manager"]), addEmployee); // Only Admin can add an employee
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Manager"]),
  updateEmployee
); // Admin and Manager can update
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin","Manager"]),
  deleteEmployee
); // Only Admin can delete an employee

export default router;

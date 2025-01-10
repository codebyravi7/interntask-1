import express from "express";
import {
  getAuditLogs,
  deleteAuditLogs,
} from "../controllers/auditController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js"; // Assuming you have role-based middleware

const router = express.Router();

// Get all audit logs (Admin-only route)
router.get("/", authMiddleware, roleMiddleware(["Admin","Manager","Regular"]), getAuditLogs);

// Delete all audit logs (Admin-only route, optional for cleanup)
router.delete("/", authMiddleware, roleMiddleware(["Admin","Manager"]), deleteAuditLogs);

export default router;

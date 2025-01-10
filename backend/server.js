import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "50mb" })); // 10mb size limit, adjust accordingly
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/audit-logs", auditRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost:27017/newintern-task", {})
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));

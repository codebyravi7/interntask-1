import axios from "axios";
import { getrealToken } from "../utils/authUtils.js";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: getrealToken(),
    "Content-Type": "application/json",
  },
});

export const getEmployees = async () => {
  const response = await api.get("/employees");
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};
export const registerUser = async (formData) => {
  const response = await api.post("/auth/register", formData);
  return response.data;
};

export const getAuditLogs = async () => {
  const response = await api.get("/audit-logs");
  return response.data;
};

export const getEmployeeDetails = async (employeeId) => {
  const response = await api.get(`/employees/${employeeId}`);
  return response.data;
};
export const deleteEmployee = async (employeeId) => {
  const response = await api.delete(`/employees/${employeeId}`);
  return response.data;
};
export const updateEmployee = async (employeeId, formData) => {
  const response = await api.put(`/employees/${employeeId}`, formData);
  return response.data;
};

export const addEmployee = async (formData) => {
  const response = await api.post(`/employees`, formData);
  return response.data;
};

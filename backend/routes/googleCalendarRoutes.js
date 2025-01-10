import express from "express";
import createEvent from "../controllers/googleCalendarController";
const router = express.Router();

router.post("/create", createEvent);

module.exports = router;

import express from "express";
import { add, attendance, booking, get } from "../controllers/events.js";
import { validateBody } from "../Functions/function.js";
import { attendanceSchema, bookeventSchema, eventAddSchema } from "../controllers/Validate.js";
const eventRouter = express.Router();

eventRouter.get("/events",get);
eventRouter.post("/events",validateBody(eventAddSchema),add);
eventRouter.post("/bookings",validateBody(bookeventSchema),booking);
eventRouter.post("/events/:id/attendance",validateBody(attendanceSchema),attendance);

export default eventRouter;

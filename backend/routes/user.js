import express from "express";
import { getBookings, insert } from "../controllers/user.js";
import { validateBody } from "../Functions/function.js";
import { userAddSchema } from "../controllers/Validate.js";
const userRouter = express.Router();

userRouter.post("/insert",validateBody(userAddSchema),insert);
userRouter.get("/users/:id/bookings",getBookings);
export default userRouter;

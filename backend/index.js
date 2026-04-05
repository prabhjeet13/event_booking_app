import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import eventRouter from "./routes/events.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.json());

app.use("/events/api/v1/user",userRouter);
app.use("/events/api/v1/event",eventRouter);


app.listen(PORT, ()=> {
    console.log(`server is listening on ${PORT}`);
})

import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import eventRouter from "./routes/events.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
dotenv.config();
const app = express();


const swaggerDocument = YAML.load("./swagger/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 4001;
app.use(express.json());

app.use("/events/api/v1/user",userRouter);
app.use("/events/api/v1/event",eventRouter);


app.listen(PORT, ()=> {
    console.log(`server is listening on ${PORT}`);
})

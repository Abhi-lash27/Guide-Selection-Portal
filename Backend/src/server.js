import express from "express";
import cors from "cors";
import logger from "pino-http";
import pretty from "pino-pretty";
import router from "./router.js";

import { signIn } from "./handlers/login.js";
import { createStudent } from "./handlers/student.js";
import { expressjwt as jwt } from "express-jwt";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const stream = pretty({
  colorize: true,
});
app.use(logger(stream));

app.post("/login/:role", signIn);
app.post("/signup", createStudent);

app.use("/api", jwt({secret: process.env.SECRET_KEY, algorithms: ["HS256"]}),router);
// app.use("/api",router);



export default app;

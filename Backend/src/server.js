import express from "express";
import cors from "cors";
import logger from "pino-http";
import pretty from "pino-pretty";
import router from "./router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const stream = pretty({
  colorize: true
})
app.use(logger(stream))

app.use('/api', router)
export default app
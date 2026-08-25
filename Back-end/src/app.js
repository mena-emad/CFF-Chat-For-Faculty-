import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { aiRoutes } from "./container.js";

import gerror from "./utils/gerror.js";

const app = express();

app.use(cors({origin:["http://localhost:5173","https://cffai.vercel.app"],credentials:true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/ai",aiRoutes.getRouter());
app.use(gerror);

export default app;
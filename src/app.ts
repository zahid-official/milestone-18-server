import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import type { Application, Request, Response } from "express";
import config from "./config/index.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";
import ModuleRouter from "./routes/index.js";

// Express application
const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: [`${config.frontend_url}`],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));

// routes middleware
app.use("/api/v1", ModuleRouter);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is running..",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + " sec",
    timeStamp: new Date().toISOString(),
  });
});

// Handle global & not found error
app.use(globalErrorHandler);
app.use(notFound);

export default app;

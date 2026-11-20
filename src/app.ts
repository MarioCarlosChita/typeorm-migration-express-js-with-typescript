
import { json } from "body-parser";
import express, { Request, Response } from "express";
import { taskRouter } from "./routers/task-router";
import { container } from "./container/container";

const app = express();
app.use(json());

app.use('/api/v1/task',taskRouter(container.controller.taskController));

app.get("/api/v1/health",(
    req: Request,
    res: Response
  ) => {
  return res.status(200).json({ status: 200, message: "The api is ok!"});
});
export default app;

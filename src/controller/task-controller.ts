import { Request, Response } from "express";
import { TaskRepository } from "../repository/task-repository";
import { CreateTask } from "../dto/create-task";
import { UpdateTask } from "../dto/update-task";

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  public update = async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);
      const task = await this.taskRepository.show(id);
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
          status: 400,
        });
      }
      const { title, description, isComplete } = req.body;
      const updateTask: UpdateTask = {
        title: title,
        description: description,
        isComplete: isComplete,
        updatedAt: new Date(),
      };

      await this.taskRepository.update(id, updateTask);

      return res.status(200).json({
        status: 200,
        message: "Task updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  };
  public show = async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);
      const task = await this.taskRepository.show(id);

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
          status: 404,
        });
      }

      return res.status(200).json({
        task: task,
        message: "success",
        status: 200,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  };

  public index = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskRepository.index();
      return res.status(200).json({
        tasks: tasks,
        status: 200,
        message: "sucess",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const createTask: CreateTask = {
        title: title,
        description: description,
      };

      const result = await this.taskRepository.create(createTask);

      return res.status(201).json({
        status: 201,
        task: result,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  };
}

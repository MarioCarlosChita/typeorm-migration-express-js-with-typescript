import { AppDataSource } from "../database/data-source";
import { CreateTask } from "../dto/create-task";
import { UpdateTask } from "../dto/update-task";
import { Task } from "../entities/task";

export interface ITaskRepository {
  create(createTask: CreateTask): Promise<Task>;
  index():Promise<Task[]>; 
  show(id:number):Promise<Task | null>;  
  update(id:number,updateTask:UpdateTask):Promise<boolean>;
  
}

export class TaskRepository implements ITaskRepository {
  public async  update(id: number, updateTask: UpdateTask): Promise<boolean> {
     const taskRepository = AppDataSource.getRepository(Task);
     const result = await taskRepository.update(id, updateTask);
     return (result.affected ?? 0) > 0;
  }
  
  public  async show(id: number): Promise<Task | null> {
    const taskRepository = AppDataSource.getRepository(Task); 
    const task = await taskRepository.findOneBy({id: id});
    return task;
  } 

  public async  index(): Promise<Task[]> {
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = taskRepository.find();

    return tasks;
  }
  public async create(createTask: CreateTask): Promise<Task> {
    const taskRepository = AppDataSource.getRepository(Task);
    
    const task = taskRepository.create({
      title: createTask.title,
      description: createTask.description,
    });

    const result = await taskRepository.save(task);
    return result;
  }
}

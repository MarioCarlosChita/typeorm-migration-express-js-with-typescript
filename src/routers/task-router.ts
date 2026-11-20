import { Router } from "express";
import { TaskController } from "../controller/task-controller";




export function taskRouter(
 taskController: TaskController
):Router{
   const router = Router();
   router.post('/', taskController.create);
   router.get('/', taskController.index);
   router.get('/:id', taskController.show); 
   router.put('/:id', taskController.update);
   
   return router;
}